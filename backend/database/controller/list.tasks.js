const InitMongoose = require("../../lib/db.init")
const TasksModel = require("../models/tasks")
const ZodExecuted = require("../../lib/zod-exec")
const ListTasksValidator = require("../validator/list.tasks")

async function ListTasks({ userAuth = {}, body = { page: 0, show: 60 } }) {
  try {
    const db_init = await InitMongoose()
    if(db_init.issues) {
      return { status: 500, message: db_init.err }
    }
    const validate = ZodExecuted(ListTasksValidator, body)
    if(!!validate) {
      return validate
    }
    const limitShow = (body.show || 60)
    const readdata = await TasksModel.find({ user_id: userAuth.user_id })
      .sort({ created_at: -1 })
      .limit(limitShow + 1)
      .skip(limitShow * body.page)
    return {
      data: {
        is_next: readdata.length > limitShow,
        list: readdata.map((items, i) => ({
          "$_key": i,
          uid: items.uid,
          text: String(items.task).trim(),
          time: items.created_at,
          is_edited: new Date(items.created_at).getTime() !== new Date(items.updated_at).getTime()
        }))
      }
    }
  } catch(e) {
    console.log(`[Controller ListTasks]:`, e)
    return { status: 500, message: "Internal Server Error" }
  }
}

module.exports = ListTasks