const { z } = require("zod")

const editTasks = z.object({
  uid: z.string({ message: "UID is required!" }),
  text: z.string({ message: "Fill in the notes!" })
    .min(4, "The minimum number of letters that must be note is 4"),
})

module.exports = editTasks