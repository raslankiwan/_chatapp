import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
var jwt = require('jsonwebtoken');

export const validateRequest = async (req: Request, res: Response, next: NextFunction) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next()
    }
    res.status(401).send({ result });
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-access-token']
    if (!token) {
        return res.status(401).json({
            error: 'missing x-access-token header'
        })
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_PRIVATE_KEY)

    } catch (error) {
        return res.status(401).json({
            error
        })
    }


    // extra validation

    next();
  

}
