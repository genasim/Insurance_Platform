import {Identifiable, IdType} from "./Identifiable";

export interface Notification extends Identifiable {
    title: string,
    message: string,
    recipientId: IdType,
    createdAt: string,
}