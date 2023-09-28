import mongoose from "mongoose";

// User Registration Model
const Student = mongoose.Schema(
  {
    UserID: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    FatherName: { type: String, required: true },
    Mobile: { type: Number, required: true },
    Email: { type: String, required: true },
    Address: { type: String, required: true },
    Images: { type: Array, required: false },
    Gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    Dob: { type: Date, required: true },
    Country: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

const StudentModel = mongoose.model("Student", Student);
export { StudentModel };
