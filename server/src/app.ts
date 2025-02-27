import express, { Request, Response } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { organisationRoutes, userRoutes } from "./routes"
import { errorHandler, isAuthenticatedUser } from "./middlewares"

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

app.use(isAuthenticatedUser)
app.use(`${versionUrl}/user`, userRoutes)
app.use(`${versionUrl}/organisation`, organisationRoutes)

app.use("/", (req: Request, res: Response) => {
  res.send("Mini CMS Backend running!")
})
app.use(errorHandler)

export default app
