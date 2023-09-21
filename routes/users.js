import express from "express";
const usersRouter = express.Router();
import { getAllUsers, createNewUser, updateUser, deleteUser, getUser } from "../controllers/usersController.js";
import { verifyJwt } from "../middlewares/verifyJwt.js";

usersRouter
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .put(verifyJwt ,updateUser)
  .delete(verifyJwt ,deleteUser);

usersRouter.route("/:id").get(getUser);

export { usersRouter }