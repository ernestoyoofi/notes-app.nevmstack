const { z } = require("zod")

const listTasks = z.object({
  page: z.number({ message: "Page always number format" })
    .min(0, "Page cannot be empty.")
    .int({ message: "Page always interger" })
    .optional(),
  show: z.number({ message: "Total row data always number format" })
    .min(5, "Total row data minimum is 10")
    .max(120, "Total row data maximum is 120")
    .int({ message: "Page always interger" })
    .optional(),
})

module.exports = listTasks