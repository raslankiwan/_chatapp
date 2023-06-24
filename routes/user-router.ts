import { log } from 'console';
import express, { Request, Response } from 'express';
import { User } from '../models';

const router = express.Router();
// router.post('/user', )
// router.get('/user')
// router.put('/user')
// router.delete('/user')

// const test = async () => {
//     console.log('xxx');
//     await test2();

//     //const connection = await mongoose.connect('https://mongo.com')
//     // console.log(connection) // Object {...} // undefined
//     console.log('yyy');

// }

// async function test2  () {
//     console.log('zzz');

// }
// 'user/...'

router.route('/')
.post(async (req: Request, res: Response) => {
    const user = await User.create({
        username: 'Ahmad2',
        firstname: 'Ahmad'
    })
	// await ...
	res.send({user});
})
.get(async (req: Request, res: Response) => {
    const user = await User.findById('649619f91280b30f8dd21c63')
    res.send({user});

})


export { router as userRouter };
