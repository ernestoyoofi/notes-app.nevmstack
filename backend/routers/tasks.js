const TasksRouter = require("express").Router()
const ListTasks = require("../database/controller/list.tasks")
const ReadTasks = require("../database/controller/read.tasks")
const NewTasks = require("../database/controller/new.tasks")
const EditTasks = require("../database/controller/edit.tasks")
const DelTasks = require("../database/controller/del.tasks")
const Tasks_Middleware = require("../middleware/tasks")

TasksRouter.get("/api/v1/tasks/usermiddleware", Tasks_Middleware, (req, res) => {
  return res.status(200).json({
    data: {
      picture: String(req?.userDataAuth?.picture),
      name: String(req?.userDataAuth?.name),
    }
  })
})

TasksRouter.get("/api/v1/tasks/list", Tasks_Middleware, async (req, res) => {
  const qrw = (req?.query||{})
  const getdata = await ListTasks({
    userAuth: (req?.userDataAuth||{}),
    body: {
      page: isNaN(parseInt(qrw?.page||"0"))? 0 : parseInt(qrw?.page||"0"),
      show: isNaN(parseInt(qrw?.show||"60"))? 60 : parseInt(qrw?.show||"60"),
    }
  })
  return res.status(getdata?.status||200).json(getdata)
})

TasksRouter.get("/api/v1/tasks/read/:uid", Tasks_Middleware, async (req, res) => {
  const getdata = await ReadTasks({
    userAuth: (req?.userDataAuth||{}),
    body: {
      uid: String(req.params?.uid||"")
    }
  })
  return res.status(getdata?.status||200).json(getdata)
})

TasksRouter.post("/api/v1/tasks/create", Tasks_Middleware, async (req, res) => {
  const getdata = await NewTasks({
    userAuth: (req?.userDataAuth||{}),
    body: (req?.body||{})
  })
  return res.status(getdata?.status||200).json(getdata)
})

TasksRouter.put("/api/v1/tasks/edit/:uid", Tasks_Middleware, async (req, res) => {
  const databody = (req?.body||{})
  const getdata = await EditTasks({
    userAuth: (req?.userDataAuth||{}),
    body: {
      ...databody,
      uid: String(req.params?.uid||"")
    }
  })
  return res.status(getdata?.status||200).json(getdata)
})

TasksRouter.delete("/api/v1/tasks/del/:uid", Tasks_Middleware, async (req, res) => {
  const databody = (req?.body||{})
  const getdata = await DelTasks({
    userAuth: (req?.userDataAuth||{}),
    body: {
      ...databody,
      uid: String(req.params?.uid||"")
    }
  })
  return res.status(getdata?.status||200).json(getdata)
})

module.exports = TasksRouter