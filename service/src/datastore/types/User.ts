export type User = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    roleId: UserRoleEnum;
}

export enum UserRoleEnum {
    GUEST = 1,
    EMPLOYEE = 2
}