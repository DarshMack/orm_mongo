import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    mobile: { type: String, required: true, unique: true },
    referralCode: { type: String },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    technology: [String],
    profilePic: [String],
    dob: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
