import mongoose, {Document, Schema} from "mongoose";
import ClaimDocument from "../types/ClaimDocument";

const claimDocumentSchema: Schema = new Schema<ClaimDocument>(
    {
        claimId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Claim",
            required: [true, "ClaimId is required"],
        },
        description: {
            type: String,
        },
        claimNumber: {
            type: String,
        },
        document: {
            type: String,
            required: [true, "Document in base64 is required"],
        },
    },
    {timestamps: true, versionKey: false}
);

const claimDocumentModel = mongoose.model<ClaimDocument & Document>(
    "claim-documents",
    claimDocumentSchema
);

export default claimDocumentModel;
