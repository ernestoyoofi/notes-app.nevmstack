const generateId = require("../../lib/generate-id")
const InitMongoose = require("../../lib/db.init")
const TasksModel = require("../models/tasks")
const ZodExecuted = require("../../lib/zod-exec")
const NewTasksValidator = require("../validator/new.tasks")

async function NewTasks({ userAuth = {}, body = { text: "" } }) {
  try {
    const db_init = await InitMongoose()
    if(db_init.issues) {
      return { status: 500, message: db_init.err }
    }
    const validate = ZodExecuted(NewTasksValidator, body)
    if(!!validate) {
      return validate
    }
    const id_task = generateId.GenerateHexaRdm()
    await TasksModel.insertOne({
      uid: id_task,
      user_id: String(userAuth?.user_id||"").trim(),
      task: String(body?.text||"").trim()
    })
    return {
      data: {
        success: true,
        id: id_task,
        user_id: String(userAuth?.user_id||""),
        task: String(body?.text||"")
      }
    }
  } catch(e) {
    console.log(`[Controller NewTasks]:`, e)
    return { status: 500, message: "Internal Server Error" }
  }
}

module.exports = NewTasks