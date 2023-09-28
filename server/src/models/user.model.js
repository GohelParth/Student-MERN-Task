import mongoose from "mongoose";

// User Registration Model
const User = mongoose.Schema(
  {
    UserName: { type: String, required: true },
    Email: { type: String, required: true },
    Password: { type: String, default: null, required: false },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("User", User);
export { UserModel };
