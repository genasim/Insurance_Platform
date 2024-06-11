import mongoose, { Document, Schema } from "mongoose";
import * as bcrypt from 'bcrypt'

export enum Right {
  ADMIN = "ADMIN",
  CLIENT = "CLIENT",
  EXPERT = "EXPERT",
  ACTUARY = "ACTUARY",
}

export interface Identifiable {
  _id: mongoose.Types.ObjectId;
}

export interface User extends Identifiable {
  email: string;
  password: string;
  fullName: string;
  idNumber: string;
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
      type: String,
      unique: true,
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
    },
  },
  { timestamps: true }
);

const generateRandomIdNumber = (): string => {
  return Math.floor(1000000000 + Math.random() * 8999999999).toString();
};

userSchema.pre("save", async function (next) {
  // 'this' refers to the document currently being created and contains the validated values
  const user = this as unknown as User & Document;
  
  if (!user.idNumber) {
    let unique = false;
    while (!unique) {
      const newIdNumber = generateRandomIdNumber();
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
