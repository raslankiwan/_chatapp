import { log } from 'console';
import express, { Request, Response } from 'express';
import { User } from '../models';

const router = express.Router();
// router.post('/user', )
// router.get('/user')
// router.put('/user')
// router.delete('/user')


router.route('/')
.post(async (req: Request, res: Response) => {
    console.log(req.body.username)
    // console.log(req.query)
    const {username, firstname, lastname} = req.body

    const user = await User.create({
        username,
        firstname,
        lastname
    })
	// await ...
	res.send({user});
})
.get(async (req: Request, res: Response) => {
    const user = await User.findById('649619f91280b30f8dd21c63')
    res.send({user});

})

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id
    console.log(id)
    const user = await User.findById(id)
    res.send({user});

} )



export { router as userRouter };
