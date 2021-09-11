import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import profileRoutes from './routes/profile.js';
import leaderboardsRoutes  from './routes/leaderboards.js';


const app = express();
dotenv.config();

app.use(express.json());
//app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
const PORT = process.env.PORT;


app.use('/profile', profileRoutes);
app.use('/leaderboards', leaderboardsRoutes);

app.get('/', (req, res) => {

    res.send("hello from homepage");
})

app.listen(PORT, () => console.log(`Server running on port: https://localhost: ${PORT}`));

