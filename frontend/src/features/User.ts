import {IdType} from "./shared-types";

export interface User {
    id: IdType,
    email:  string,
    password: string,
    fullName: string,
    idNumber: string
}

export interface UserDto {
    email:  string,
    password: string,
    fullName: string,
    idNumber: string
}

