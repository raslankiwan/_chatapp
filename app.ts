import express,{ Request, RequestHandler, Response, json }  from 'express';
const app = express();
import { userRouter } from './routes/user-router'
import { conversationRouter } from './routes/conversation-router';
import { messageRouter } from './routes/message-router';


app.use(json() as RequestHandler);

app.get('/', function (req: Request , res: Response) {
  res.send('Hello World');
});
app.use('/user', userRouter)
app.use('/conversation', conversationRouter)
app.use('/messages', messageRouter)


export {app }
