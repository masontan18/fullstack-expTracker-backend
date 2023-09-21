import express from "express";
const refreshRouter = express.Router();
import { handleRefreshToken } from "../controllers/refreshController.js";

refreshRouter.route("/").post(handleRefreshToken)

export { refreshRouter }