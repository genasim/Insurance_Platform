import {Identifiable, Identifiable_} from "./Identifiable";
import {Right} from "./Rights";

export interface User extends Identifiable {
    email: string,
    password: string,
    fullName: string,
    idNumber: string,
    rights: Right[]
}

export interface User_ extends Identifiable_ {
    email: string,
    password: string,
    fullName: string,
    idNumber: number,
    rights?: Right[]
}

export type UserDto = Omit<User_, "_id" | "idNumber">