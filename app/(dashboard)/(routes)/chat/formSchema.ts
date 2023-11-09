import * as z from "zod";

export const formSchema = z.object({
    prompt: z.string().min(1, {
        message: "You need to type a prompt to continue!"
    }),
});