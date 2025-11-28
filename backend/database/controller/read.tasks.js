const InitMongoose = require("../../lib/db.init")
const TasksModel = require("../models/tasks")
const ZodExecuted = require("../../lib/zod-exec")
const ReadTasksValidator = require("../validator/read.tasks")

async function ReadTasks({ userAuth = {}, body = { uid: "" } }) {
  try {
    const db_init = await InitMongoose()
    if(db_init.issues) {
      return { status: 500, message: db_init.err }
    }
    const validate = ZodExecuted(ReadTasksValidator, body)
    if(!!validate) {
      return validate
    }
    const getdata = await TasksModel.findOne(
      { uid: String(body?.uid), user_id: String(userAuth?.user_id) }
    )
    if(!getdata) {
      return {
        status: 404,
        message: "Note not found!"
      }
    }
    return {
      data: {
        success: true,
        uid: getdata.uid,
        text: String(getdata.task).trim(),
        time: getdata.created_at,
        is_edited: new Date(getdata.created_at).getTime() !== new Date(getdata.updated_at).getTime()
      }
    }
  } catch(e) {
    console.log(`[Controller NewTasks]:`, e)
    return { status: 500, message: "Internal Server Error" }
  }
}

module.exports = ReadTasks