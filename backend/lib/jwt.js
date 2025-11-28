require("./dotenv")
const jwt = require("jsonwebtoken")

const passkey = (process?.env?.JSONWEBTOKEN_SECRET_KEY||"defaulttoken")

function toAuthToken({ auth = "", user_id = "", email = "" } = {}) {
  return jwt.sign({
    time: new Date().getTime(),
    user_id: user_id,
    email: email,
    auth: auth,
  }, passkey, {
    algorithm: "HS256",
    expiresIn: "80d"
  })
}

function toAuthData(data = "") {
  try {
    const dataToken = jwt.verify(data, passkey)
    return {
      user_id: dataToken?.user_id||"",
      email: dataToken?.email||"",
      auth: dataToken?.auth||"",
      error: false,
    }
  } catch(e) {
    console.log(e)
    return { error: true }
  }
}

module.exports = {
  toAuthToken,
  toAuthData
}