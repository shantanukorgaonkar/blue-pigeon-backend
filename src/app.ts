import express from 'express';
import { json } from 'body-parser';
import ConnectDB from './db/config';
import userRouter from './routes/user.routes'
import cors from 'cors';

const app = express()
ConnectDB()
app.use(cors());
app.use(json())

app.use('/api/v1/users', userRouter)

app.listen(3000, () => console.log("SEREVER UP"))

export default app