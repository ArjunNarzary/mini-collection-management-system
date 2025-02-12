import express, { Request, Response } from "express"
import cors from "cors"
import { userRoutes } from "./routes"
import { errorHandler } from "./middlewares"

const versionUrl = "/api/v1"

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)

app.use(`${versionUrl}/user`, userRoutes)

app.use(errorHandler)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server")
})

export default app
