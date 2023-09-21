import express from "express"
import cors from "cors"
import { credentials } from "./middlewares/credential.js"
import { usersRouter } from "./routes/users.js"
import { authRouter } from "./routes/auth.js"
import { refreshRouter } from "./routes/refresh.js"
import { expensesRouter } from "./routes/expenses.js"

const app = express()
const port = process.env.PORT || 8080

// custom and third party middlewares for cors
app.use(credentials)
app.use(cors())

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

app.use("/users", usersRouter)
app.use("/auth", authRouter)
app.use("/refresh", refreshRouter)
app.use("/expenses", expensesRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})