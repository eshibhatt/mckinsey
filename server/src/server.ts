import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes';
import candidateRoutes from './routes/candidateRoutes';
import questionRoutes from './routes/questionRoutes';
import errorHandler from './utils/errorHandler';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

mongoose
	.connect(process.env.MONGO_URI!)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/candidates', candidateRoutes);

app.use(errorHandler);

app.route('/api-status').get((req, res) => {
	res.status(200).json({
		success: true,
	});
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
