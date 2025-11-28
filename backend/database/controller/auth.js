const UserModel = require("../models/users")
const InitMongoose = require("../../lib/db.init")
const Jwt = require("../../lib/jwt")

async function AuthMiddle({ auth_token = "" }) {
  try {
    const db_init = await InitMongoose()
    if(db_init.issues) {
      return { status: 500, message: db_init.err }
    }
    const tokenextract = Jwt.toAuthData(auth_token||"")
    if(tokenextract.error) {
      return { status: 400, message: "Error Token!" }
    }
    const user = await UserModel.findOne({ 
      email: String(tokenextract.email||""),
      auth: String(tokenextract.auth||""),
      user_id: String(tokenextract.user_id||""),
    }).exec()
    if(!user) {
      return { status: 401, message: "Unauthorization!" }
    }
    return {
      data: {
        user_id: user.user_id,
        picture: user.picture,
        name: user.name,
        picture: user.picture,
      }
    }
  } catch(e) {
    console.log(`[Controller OAuthAPIGenerateToken]:`, e)
    return { status: 500, message: "Internal Server Error" }
  }
}

module.exports = AuthMiddle