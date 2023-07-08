import express,{ Request, RequestHandler, Response, json }  from 'express';
const app = express();
import { userRouter } from './routes/user-router'

// const test = (req:any, res:any, next: any) => {
//     console.log('Hellooo')
//     next()
// }
// route

app.use(json() as RequestHandler);

app.get('/', function (req: Request , res: Response) {
  res.send('Hello World');
});
app.use('/user', userRouter)


export {app }
