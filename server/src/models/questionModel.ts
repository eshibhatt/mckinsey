import mongoose, { Document, Schema } from 'mongoose';

interface Question extends Document {
	text: string;
	options: string[];
	marks: number;
	negativeMarks: number;
	correctOption: number;
	tags: string[];
}

const QuestionSchema: Schema = new Schema({
	text: { type: String, required: true },
	options: { type: [String], required: true },
	marks: { type: Number, required: true },
	negativeMarks: { type: Number, required: true },
	correctOption: { type: Number, required: true },
	tags: { type: [String], required: true },
});

export default mongoose.model<Question>('Question', QuestionSchema);
