import mongoose, { Document, Schema } from 'mongoose';

interface Account extends Document {
	username: string;
	password: string;
	role: 'Admin' | 'Delivery Admin';
}

const AccountSchema: Schema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ['Admin', 'Delivery Admin'], required: true },
});

export default mongoose.model<Account>('Account', AccountSchema);
