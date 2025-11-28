const GoogleAuthRouter = require("express").Router()
const AuthGoogle = require("../auth/oauth.google")
const OAuthAPI = require("../database/controller/oauth-api")

GoogleAuthRouter.get("/api/v1/oauth", async (req, res) => {
  if(req?.query?.return_as_respon === "1") {
    res.cookie("return_as_respon", "1") // Set Responses
  }
  const uri = await AuthGoogle.GoogleOauth_AuthURI()
  return res.redirect(uri)
})

GoogleAuthRouter.get("/api/v1/oauth/callback", async (req, res) => {
  const codeToken = String(req?.query?.code||"")
  // Google Fetching Profile
  const GoogleFetchProfile = await AuthGoogle.GoogleOauth_Fetchprofile(codeToken)
  // Error
  if(GoogleFetchProfile.error) {
    return res.status(400).json({
      status: 400,
      message: "Bad Request!",
      redirect: "/api/v1/oauth"
    })
  }
  // OAuth Control
  const authtoken = await OAuthAPI(GoogleFetchProfile)
  const headerBrowser = ["user-agent", "sec-ch-ua-platform", "sec-ch-ua-mobile", "sec-fetch-mode"]
  const getIsBrowser = !headerBrowser.filter(a => !Object.keys(req.headers).includes(a))[0]

  // Response As JSON
  if(req.cookies["return_as_respon"] === "1" || !getIsBrowser) {
    if(req.cookies["return_as_respon"] === "1") {
      res.clearCookie("return_as_respon")
    }
    return res.status(200).json(authtoken)
  }

  // Sign As Browser
  res.cookie("notesapp-auth", String(authtoken?.data?.token||""), { maxAge: 1000*60*60*24*7, secure: true })
  return res.status(200).redirect("/app?welcome=true")
})

module.exports = GoogleAuthRouter