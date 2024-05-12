import {Right} from "../../models/Rights";

export interface UserDto {
    email:  string,
    password: string,
    fullName: string,
    idNumber: string,
    rights: Right[]
}
