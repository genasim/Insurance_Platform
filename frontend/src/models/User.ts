import {Identifiable} from "./Identifiable";

export interface User extends Identifiable {
    email: string,
    password: string,
    fullName: string,
    idNumber: string
}
