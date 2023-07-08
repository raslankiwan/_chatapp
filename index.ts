import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT

import  {app}  from './app';
import { connectToMongo } from './db/mongodb-connection';

const start = async () => {
    await connectToMongo()
    app.listen(port);
}

start()
