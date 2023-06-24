import  {app}  from './app';
import { connectToMongo } from './db/mongodb-connection';

const start = async () => {
    await connectToMongo()
    app.listen(3000);
}

start()
