import express from 'express';
import { json } from 'body-parser';
import ConnectDB from './db/config';
import userRouter from './routes/user.routes'
import postRouter from './routes/post.routes'
import interestsRouter from './routes/interests.routes'
import industriesRouter from './routes/industries.routes'
import cors from 'cors';

const app = express()
ConnectDB()
app.use(cors());
app.use(json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/v1/interests', interestsRouter)
app.use('/api/v1/industries', industriesRouter)
app.use('/api/v1/media', express.static('uploads'))

app.listen(3000, () => console.log("SEREVER UP"))

export default app