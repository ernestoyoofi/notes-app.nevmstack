const InitMongoose = require("../../lib/db.init")
const TasksModel = require("../models/tasks")
const ZodExecuted = require("../../lib/zod-exec")
const EditTasksValidator = require("../validator/edit.tasks")

async function EditTasks({ userAuth = {}, body = { uid: "", text: "" } }) {
  try {
    const db_init = await InitMongoose()
    if(db_init.issues) {
      return { status: 500, message: db_init.err }
    }
    const validate = ZodExecuted(EditTasksValidator, body)
    if(!!validate) {
      return validate
    }
    const editdata = await TasksModel.updateOne(
      { uid: String(body?.uid), user_id: String(userAuth?.user_id) },
      { task: String(body?.text||"").trim(), updated_at: new Date() }
    )
    if(editdata.modifiedCount === 0) {
      return { status: 400, message: "Note not found!" }
    }
    return {
      data: {
        success: true
      }
    }
  } catch(e) {
    console.log(`[Controller EditTasks]:`, e)
    return { status: 500, message: "Internal Server Error" }
  }
}

module.exports = EditTasks