import {Schema} from "mongoose";

export interface Notification {
    title: string,
    message: string,
    recipientId: Schema.Types.ObjectId,
    createdAt: Date
}