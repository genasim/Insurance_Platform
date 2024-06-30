import {Identifiable, IdType} from "./Identifiable";

export interface Notification extends Identifiable {
    _id: string,
    title: string,
    message: string,
    recipientId: IdType,
    createdAt: string,
}