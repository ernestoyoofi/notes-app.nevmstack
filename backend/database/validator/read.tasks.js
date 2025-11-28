const { z } = require("zod")

const delTasks = z.object({
  uid: z.string({ message: "UID is required!" }),
})

module.exports = delTasks