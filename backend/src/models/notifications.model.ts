import mongoose, {Document, Schema} from "mongoose";
import {Notification} from "../types/Notification";

const notificationSchema = new Schema<Notification>(
    {
        recipientId: {
            type: Schema.Types.ObjectId
        },
        title: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Schema.Types.Date,
            required: true,
        }
    }
);

const notificationModel = mongoose.model<Notification & Document>(
    "notifications",
    notificationSchema
);

export default notificationModel;
