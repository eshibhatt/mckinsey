import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import questionRoutes from './routes/questionRoutes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
	.connect(process.env.MONGO_URI!)
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));

app.use('/api', questionRoutes);

app.route('/api-status').get((req, res) => {
		res.status(200).json({
			success: true,
		});
	});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
