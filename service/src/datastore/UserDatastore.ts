import  Knex  from 'knex';
import type { Knex as KnexType } from 'knex';
import knexConfig from '../knexConnection.js';
import { User } from './types/User.js';
import { v4 as uuid } from 'uuid';

export class UserDatastore {
    private datastore: KnexType;
    constructor() {
        this.datastore = Knex(knexConfig.development);
    }

    async addUser(user: User): Promise<boolean> {
        try {
            const res = await this.datastore('user').insert({userId: uuid(), ...user});
            return true;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to add user");
        }
    }
}