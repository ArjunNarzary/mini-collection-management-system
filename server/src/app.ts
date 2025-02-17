import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
const versionUrl = process.env.VERSION_URL || "/api/v1"

app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
)

app.use("/", (req: Request, res: Response) => {
  res.send("Mini CMS Backend running!")
})

export default app
