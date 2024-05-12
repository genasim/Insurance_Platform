import {Identifiable, IdType} from "./Identifiable";

export interface Notification extends Identifiable {
    message: string,
    recipientId: IdType
}