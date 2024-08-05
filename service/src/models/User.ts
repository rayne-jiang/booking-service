import { AddUserMutationResponse, User as UserInput } from "../__generated__/resolvers-types";
import { UserDatastore } from "../datastore/UserDatastore.js";
import { UserRoleEnum } from "../datastore/types/User.js";

export class UserModel {
    private userDB: UserDatastore;
    constructor() {
        this.userDB = new UserDatastore();
    }

    async addUser(input: UserInput): Promise<AddUserMutationResponse> {
        try{
            const user = {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                phone: input.phone,
                roleId: UserRoleEnum.GUEST,
                password: "password",
            };
            await this.userDB.addUser(user);
            return {
                success: true,
                message: "New user added!",
            };
        } catch (error) {
            console.error(error);
            return {
                success: false,
                message: `Failed to add user: ${error}`,
            };
        }
    }

    async getUserById(userId: string) {
        return await this.userDB.getUserById(userId);
    }
}