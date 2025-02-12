import express, { Request, Response } from "express"
import cors from "cors"
import { userRoutes } from "./routes"
import { errorHandler, isAuthenticatedUser } from "./middlewares"
import cookieParser from "cookie-parser"

const versionUrl = "/api/v1"

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)

app.use(isAuthenticatedUser)

app.use(`${versionUrl}/user`, userRoutes)

app.use(errorHandler)
app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server")
})

export default app
