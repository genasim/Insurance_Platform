import {Identifiable} from "./Identifiable";
import {Right} from "./Rights";

export interface User extends Identifiable {
    email: string,
    password: string,
    fullName: string,
    idNumber: string,
    rights: Right[]
}
