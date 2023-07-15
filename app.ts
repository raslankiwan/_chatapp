import express,{ Request, RequestHandler, Response, json }  from 'express';
const app = express();
import { userRouter } from './routes/user-router'
import { conversationRouter } from './routes/conversation-router';
import { messageRouter } from './routes/message-router';
import axios from 'axios';
import bodyParser from 'body-parser'

app.use(json() as RequestHandler);
app.use(bodyParser)


app.get('/', async function (req: Request , res: Response) {
  const options = {
    method: 'GET',
    url: 'https://weatherbit-v1-mashape.p.rapidapi.com/forecast/3hourly',    
    params: {
      lat: '35.5',
      lon: '-78.5'
    },
  };
  
  try {
    const response = await axios.request(options);
    console.log(response);
    return res.send({data: response});

  } catch (error) {
    console.error(error);
  }
  // const result = await axios.get()
  res.send('Failed');
});
app.use('/user', userRouter)
app.use('/conversation', conversationRouter)
app.use('/messages', messageRouter)


export {app }
