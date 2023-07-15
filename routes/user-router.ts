import express, { Request, Response } from 'express';
import { User } from '../models';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares';
var jwt = require('jsonwebtoken');
var bcryptjs = require('bcryptjs');

const router = express.Router();

router.route('/sign-up')
.post(
    body('username').notEmpty().withMessage('username should not be empty'),
    body('email')
        .notEmpty().withMessage('Email should not be empty')
        .isEmail().withMessage('Please send a valid email'),
    body('password')
        .notEmpty().withMessage('Password should not be empty'),
    validateRequest,
    async (req: Request, res: Response) => {
    const {username, firstname, lastname, email, password} = req.body

    const user = await User.create({
        username,
        firstname,
        lastname,
        email,
        password
    })
    const token = jwt.sign(
        {
            username,
            firstname,
            lastname,
            email,

        },
        process.env.JWT_PRIVATE_KEY
    )
	res.send({user, token});
})


router.route('/login')
.post(
    body('email')
        .notEmpty().withMessage('Email should not be empty')
        .isEmail().withMessage('Please send a valid email'),
    body('password')
        .notEmpty().withMessage('Password should not be empty'),
    validateRequest,
    async (req: Request, res: Response) => {
    const { email, password} = req.body

    const user = await User.findOne({
        email
    })
    if (user) {
        const isValid = bcryptjs.compareSync(password, user.password)
        if (isValid) {
            const token = jwt.sign(
                {
                    username: user.username,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email,
                    createdAt: user.createdAt
                },
                process.env.JWT_PRIVATE_KEY
            )
            return res.send({user, token});

        }
    }

    res.status(401).send({error: 'Invalid email or password'});

    
})




router.route('/')
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
