import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { connectDB } from "./config/db.config"
import { userRoutes } from './routes/user.routes';
import cors from "cors"
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
connectDB()
app.use(morgan('dev'))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
    res.send('Server is running...');
});

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],

    })
);


app.use("/user", userRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

