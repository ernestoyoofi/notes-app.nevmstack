const AuthMiddle = require("../database/controller/auth")

async function Tasks_Middleware(req, res, next) {
  const authorization = String(req?.headers["authorization"]||"")
  const tokenCookie = String(req?.cookies["notesapp-auth"]||"")
  const tokenAuth = String(
    String(String(authorization.startsWith("bearer ")? authorization:"")?.split("bearer ")[1]||"") || tokenCookie || ""
  )
  if(!tokenAuth || !tokenAuth.startsWith("ey")) {
    return res.status(401)?.json({
      status: 401,
      message: "Please login first!",
      redirect: "/api/v1/oauth"
    }) 
  }
  const authuser = await AuthMiddle({ auth_token: tokenAuth })
  if(authuser.message && authuser.status) {
    return res.status(authuser?.status||400)?.json(authuser)
  }
  req.userDataAuth = authuser.data
  res.setHeader("x-middleware-tasks", "yes")
  next()
}

module.exports = Tasks_Middleware