import {Right} from "../../models/Rights";

export interface CreateUserDto {
    email:  string,
    password: string,
    fullName: string,
    idNumber: string,
    rights: Set<Right>
}
