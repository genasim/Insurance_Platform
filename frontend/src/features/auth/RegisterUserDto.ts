import {Right} from "../../models/Rights";

export interface RegisterUserDto {
    email:  string,
    password: string,
    fullName: string,
    idNumber: string,
    rights: Set<Right>,
}
