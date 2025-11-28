const UserModel = require("../models/users")
const generateId = require("../../lib/generate-id")
const InitMongoose = require("../../lib/db.init")
const Jwt = require("../../lib/jwt")

async function OAuthAPIGenerateToken({ name = "", picture = "", email = "" }) {
  try {
    const db_init = await InitMongoose()
    if(db_init.issues) {
      return { status: 500, message: db_init.err }
    }

    let users = await UserModel.findOne({ email: String(email||"") }).exec()
    
    if(!users) {
      const createUser = await UserModel.create({
        user_id: generateId.GenerateUID(),
        picture: String(picture),
        name: String(name),
        email: String(email),
        auth: generateId.GenerateHexaRdm(),
      })
      users = createUser
    }

    const tokenUp = `userauth-${generateId.GenerateHexaRdm()}`
    await UserModel.updateOne(
      { user_id: users.user_id },
      { auth: tokenUp }
    )
 
    const tokenGenerate = Jwt.toAuthToken({
      auth: tokenUp, user_id: users.user_id, email: users.email
    })

    return {
      data: { token: tokenGenerate }
    }
  } catch(e) {
    console.log(`[Controller OAuthAPIGenerateToken]:`, e)
    return { status: 500, message: "Internal Server Error" }
  }
}

module.exports = OAuthAPIGenerateToken