import mongoose, { Document, Schema } from "mongoose";
import bcrypt from 'bcrypt'
import generateRandomIdNumber from "../utils/generateRandomIdNumber";

export enum Right {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  EXPERT = "EXPERT",
  ACTUARY = "ACTUARY",
}

export interface User {
  email: string;
  password: string;
  fullName: string;
  idNumber: number;
  rights: Right[];
}

const userSchema: Schema = new Schema<User>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, "Email is invalid"],
      validate: [
        async function () {
          const result = await userModel.countDocuments({ email: this.email });
          return result === 0 ? true : false;
        },
        "Email is already in use",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain one lowercase, one uppercase and one special character",
      ],
    },
    fullName: {
      type: String,
      required: [true, "Full name is required"],
    },
    idNumber: {
      type: Number,
      unique: true,
      minlength: 10,
    },
    rights: {
      required: [true, "Rights are required"],
      type: [
        {
          type: String,
          enum: {
            values: [...Object.keys(Right)],
            message: "{VALUE} is not a supported Right",
          },
        },
      ],
      default: [Right.EXPERT]
    },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  // 'this' refers to the document currently being created and contains the validated values
  const user = this as unknown as User & Document;
  
  if (!user.idNumber) {
    let unique = false;
    while (!unique) {
      const newIdNumber = generateRandomIdNumber(10);
      const existingUser = await userModel.findOne({ idNumber: newIdNumber });
      if (!existingUser) {
        user.idNumber = newIdNumber;
        unique = true;
      }
    }
  }

  if (user.isModified("password") || user.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (err) {
      return next(err);
    }
  }

  next();
});

const userModel = mongoose.model<User & Document>("users", userSchema);

export default userModel;
