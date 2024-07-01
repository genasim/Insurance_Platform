import mongoose, { Document, Schema } from "mongoose";
import ClaimDocument from "../types/ClaimDocument";
import PolicyTemplate from "../types/PolicyTemplate";
import PolicyType from "../types/PolicyType";

const policyTemplateSchema: Schema = new Schema<PolicyTemplate>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    type: {
      type: String,
      enum: {
        values: Object.values(PolicyType),
        message: "{VALUE} is not a supported Policy Type"
      }
    },
    meta: {
      type: String,
      required: [true, "Meta is required"],
      max: [200, "Meta cannot be longer than 200 characters"]
    },
    description: {
        type: [String],
        required: [true, "Description is required"],
        validate: [
          (value) => {
            return (value as string[]).length === 3 ? true : false;
          },
          "Policy template must have at 3 description entries",
        ],
      },
  },
  { timestamps: true, versionKey: false }
);

const policyTemplatesModel = mongoose.model<ClaimDocument & Document>(
  "policy-templates",
  policyTemplateSchema
);

export default policyTemplatesModel;
