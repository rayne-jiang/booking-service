import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { UserModel } from "./models/User.js";
import { ReservationModel } from "./models/Reservation.js";
import resolvers from "./resolvers/index.js";
import { readFileSync } from "fs";
import { config } from 'dotenv';
import jwt from 'jsonwebtoken';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

config();

const app = express();
app.use(bodyParser.json());
app.use(cors());

export interface MyContext {
  UserModel: UserModel;
  ReservationModel: ReservationModel;
  userInfo: any;
}

app.post('/login', async (req, res) => {
  try{
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send('Email and password are required');
      return res;
    }
    const user = await new UserModel().authenticateUser(email, password);
  
    if (user) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET || '', { expiresIn: '1h' });
      res.json({ token, userRole: user.roleId });
    } else {
      res.status(401).send('Unauthorized');
    }
    return res;
  }catch(error){
    res.status(400).send(error);
  }
});

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async ({req}) => {
    const token = req.headers.authorization || '';
    let decodedInfo = null;

    if (token) {
      try {
        const cleanToken = token.replace('Bearer ', '');
        decodedInfo = jwt.verify(cleanToken, process.env.JWT_SECRET || '');
      } catch (error) {
        throw new Error('Invalid token');
      }
    } else {
      throw new Error('No token provided');
    }
    return {
      UserModel: new UserModel(),
      ReservationModel: new ReservationModel(),
      userInfo: decodedInfo,
    };
  },
});

console.log(`🚀 Server listening at: ${url}`);

app.listen(3001, () => {
  console.log('🚀 REST API listening at: http://localhost:3001');
});
