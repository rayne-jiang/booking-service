import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { UserModel } from "./models/User.js";
import { ReservationModel } from "./models/Reservation.js";
import resolvers from "./resolvers/index.js";
import { readFileSync } from "fs";

// Note: this only works locally because it relies on `npm` routing
// from the root directory of the project.
const typeDefs = readFileSync("./schema.graphql", { encoding: "utf-8" });

export interface MyContext {
  UserModel: UserModel;
  ReservationModel: ReservationModel;
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    return {
      UserModel: new UserModel(),
      ReservationModel: new ReservationModel(),
    };
  },
});

console.log(`🚀 Server listening at: ${url}`);
