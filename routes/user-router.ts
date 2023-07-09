import express, { Request, Response } from 'express';
import { User } from '../models';

const router = express.Router();

router.route('/')
.post(async (req: Request, res: Response) => {
    console.log(req.body.username)
    const {username, firstname, lastname} = req.body

    const user = await User.create({
        username,
        firstname,
        lastname
    })
	res.send({user});
})
.get(async (req: Request, res: Response) => {
    const users = await User.find()
    res.send({users});

})

router.route('/:id')
    .get(async (req: Request, res: Response) => {
        const id = req.params.id
        console.log(id)
        const user = await User.findById(id)
        res.send({user});

    })
    .put( async (req: Request, res: Response) => {
        const id = req.params.id
        const { lastname } = req.body

        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    lastname
                }
            }, 
            {
                new: true,
                
            })
        res.send({user});
    })
    .delete(async (req: Request, res: Response) => {
        const id = req.params.id
        console.log(id)
        await User.deleteOne({_id: id})
        res.send({'result': 'Success'});

    })



export { router as userRouter };
