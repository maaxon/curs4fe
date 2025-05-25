import {z} from "zod";

export const schema = z.object({
    title: z.string().min(3, "3-20 characters").max(50, "3-20 characters"),
    description: z.string().max(200, "3-200 characters"),
    location: z.string().nullable(),
    salary: z.number().nullable()
});