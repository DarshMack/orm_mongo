import express from "express";
import {
  createUser,
  updateUser,
  listUsers,
} from "../controllers/userController.js";
import { auth } from "../config/common.js";

const router = express.Router();

router.post("/users", createUser);

router.put("/users/:id", auth, updateUser);

router.get("/user", listUsers);

export default router;
