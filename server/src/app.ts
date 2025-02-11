import express, { Request, Response } from "express"
import cors from "cors"

const versionUrl = "/api/v1"

const app = express()

app.use(express.json())
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + Typescript Server")
})

export default app
