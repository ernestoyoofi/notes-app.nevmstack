require("../lib/dotenv")
const { google } = require("googleapis")

const oauth = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT,
)

async function GoogleOauth_AuthURI() {
  const scopeGoogle = [
    "auth/userinfo.profile",
    "auth/userinfo.email"
  ]
  return oauth.generateAuthUrl({
    access_type: "offline",
    login_hint: "select_account",
    scope: scopeGoogle.map(a => (`https://www.googleapis.com/${a}`)).join(" ")
  })
}

async function GoogleOauth_Fetchprofile(code) {
  try {
    const { tokens } = await oauth.getToken(code)
    oauth.setCredentials(tokens)
    const request = await oauth.request({
      url: `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${tokens.access_token}`
    })
    return {
      name: request?.data?.name,
      picture: request?.data?.picture,
      email: request?.data?.email,
      location: request?.data?.locale || "en"
    }
  } catch(err) {
    console.error("[Google OAuth Error]:", err)
    return { error: "Internal Error!" }
  }
}

module.exports = {
  GoogleOauth_AuthURI,
  GoogleOauth_Fetchprofile
}