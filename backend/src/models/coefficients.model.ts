import mongoose, { Document, Schema } from "mongoose";
import ClaimDocument from "../types/ClaimDocument";
import PolicyType from "../types/PolicyType";
import Coefficient, {CoefficientValue} from "../types/Coefficient";

const coefficientSchema: Schema = new Schema<Coefficient>(
  {
    type: {
      type: String,
      required: [true, "Type is required"],
    },
    policyType: {
      type: String,
      required: [true, "PolicyType is required"],
      enum: {
        values: Object.values(PolicyType),
        message: "{VALUE} is not a supported Policy Type"
      }
    },
    isEnabled: {
      type: Boolean,
      required: [true, "IsEnabled is required"],
    },
    values: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Values are required"],
        validate: [
          (value) => {
            return (value as CoefficientValue[]).length >= 1 ? true : false;
          },
          "Coefficients must have at least one named value",
        ],
      },
  },
  { timestamps: true, versionKey: false }
);

const coefficientModel = mongoose.model<ClaimDocument & Document>(
  "calculation-coefficients",
  coefficientSchema
);

export default coefficientModel;
