import { z } from "zod";

export const questionSchema = z.object({
	questionText: z.string().min(1, 'Question text is required'),
	options: z.array(z.string()).length(4, 'Exactly 4 options are required'),
	correctOption: z.string().min(1, 'Correct option is required'),
	marks: z.number().min(0, 'Marks should be a positive number'),
	negativeMarks: z.number().optional(),
	tags: z.array(z.string()).optional(),
});
