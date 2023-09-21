import express from "express";
import { getAllExpenses, addExpense, updateExpense, deleteExpense, getAnExpense, getUserExpenses } from "../controllers/expensesController.js";
import { verifyJwt } from "../middlewares/verifyJwt.js"

const expensesRouter = express.Router();

expensesRouter.route("/").post(addExpense).get(getAllExpenses).delete(verifyJwt, deleteExpense).put(verifyJwt, updateExpense);

expensesRouter.route("/:id").get(getAnExpense)

expensesRouter.route("/users/:id").get(getUserExpenses)

export { expensesRouter };