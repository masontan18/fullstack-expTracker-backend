import express from "express";
const authRouter = express.Router();
import { handleLogin } from "../controllers/authController.js";

authRouter.route("/").post(handleLogin)

export { authRouter }