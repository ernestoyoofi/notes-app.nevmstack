const InitMongoose = require("../../lib/db.init")
const TasksModel = require("../models/tasks")
const ZodExecuted = require("../../lib/zod-exec")
const DelTasksValidator = require("../validator/del.tasks")

async function DeleteTasks({ userAuth = {}, body = { uid: "" } }) {
  try {
    const db_init = await InitMongoose()
    if(db_init.issues) {
      return { status: 500, message: db_init.err }
    }
    const validate = ZodExecuted(DelTasksValidator, body)
    if(!!validate) {
      return validate
    }
    const deletedata = await TasksModel.deleteOne({ uid: body.uid, user_id: userAuth.user_id })
    if(deletedata.deletedCount === 0) {
      return { status: 400, message: "Note not found!" }
    }
    return {
      data: {
        success: true
      }
    }
  } catch (e) {
    console.log(`[Controller DeleteTasks]:`, e)
    return { status: 500, message: "Internal Server Error" }
  }
}

module.exports = DeleteTasks