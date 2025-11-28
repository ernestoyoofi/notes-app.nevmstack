require("./lib/dotenv")
const express = require("express")
const cookieParser = require("cookie-parser")

const Route_OAuth = require("./routers/oauth")
const Route_Tasks = require("./routers/tasks")

const app = express()
const port = process.env.PORT || 3200
const host = process.env.HOST || "127.0.0.1"

app.use((req, res, next) => {
  console.log(`[Request]: ${req.method} ${req.url}`)
  next()
})
app.use(express.json())
app.use(cookieParser()) // Cookie
app.use(Route_OAuth) // OAuth Route
app.use(Route_Tasks) // Tasks Route
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: "Not Found",
  })
})

app.listen(port, host, () => {
  console.log(`[Log]: Server running at http://${host}:${port}`)
})