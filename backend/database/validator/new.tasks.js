const { z } = require("zod")

const newTasks = z.object({
  text: z.string({ message: "Fill in the notes!" })
    .min(4, "The minimum number of letters that must be note is 4"),
})

module.exports = newTasks