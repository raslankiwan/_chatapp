import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT
var cron = require('node-cron');

import  {app}  from './app';
import { connectToMongo } from './db/mongodb-connection';

const runCronJobs = () => {

    cron.schedule('*/10 * * * * */1', () => {
      console.log('running a task every 10 seconds');
    });
};

const start = async () => {
    await connectToMongo()
    runCronJobs()
    app.listen(port, () => {
        console.log(`Started server at localhost:${port}`);
        
    });
}

start()
