const zodError = require("zod").z.ZodError

function zodValidation(zodSchemaValidate, dataForm = {}) {
  try {
    zodSchemaValidate.parse(dataForm)
    return null
  } catch(e) {
    console.log("[Track]", e, dataForm)
    if(e instanceof zodError) {
      return {
        status: 400,
        message: e.issues.map(a => String(a.message)).join(", ")
      }
    }
    console.log("[Form Validation]:", e)
    return {
      status: 500,
      message: "Error configuration validation"
    }
  }
}

module.exports = zodValidation