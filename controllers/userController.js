import User from "../schemas/userSchema.js";
import multer from "multer";
import { sendResponse } from "../config/common.js";

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage }).array("profilePic", 5);

// Create User
export const createUser = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) return sendResponse(res, 400, { message: err.message });

      const user = new User({
        ...req.body,
        profilePic: req.files.map((file) => file.path),
      });

      await user.save();
      sendResponse(res, 201, { message: "User created successfully" });
    });
  } catch (error) {
    sendResponse(res, 500, { message: error.message });
  }
};

// Update User
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) return sendResponse(res, 404, { message: "User not found" });
    sendResponse(res, 200, { message: "User updated", user });
  } catch (error) {
    sendResponse(res, 500, { message: error.message });
  }
};

// List Users
export const listUsers = async (req, res) => {
  try {
    const users = await User.find();
    sendResponse(res, 200, { users });
  } catch (error) {
    sendResponse(res, 500, { message: error.message });
  }
};
