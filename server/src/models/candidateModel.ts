import mongoose, { Document, Schema } from 'mongoose';

interface Candidate extends Document {
	name: string;
	email: string;
	appliedDate: Date;
}

const CandidateSchema: Schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	appliedDate: { type: Date, default: Date.now },
});

export default mongoose.model<Candidate>('Candidate', CandidateSchema);
