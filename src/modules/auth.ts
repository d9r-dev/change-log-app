import jwt, { JwtPayload } from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express';

import { ICustomRequest } from '../types/interfaces';

export const createJWT = (user: { id: string; username: string }) => {
    if (!process.env.JWT_SECRET) {
        console.error('No JWT_SECRET set in envirnoment')
        return
    }
    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
    )
    return token
}

export const protect = (req: ICustomRequest, res: Response, next: NextFunction) => {
    const bearer = req.headers.authorization

    if (!bearer) {
        res.status(401)
        res.json({ message: 'not authorized' })
        return
    }

    const [, token] = bearer.split(' ')

    if (!token) {
        res.status(401)
        res.json({ message: 'no valid token' })
        return
    }

    try {
        if (!process.env.JWT_SECRET) {
            console.error('No JWT_SECRET set in envirnoment')
            return
        }
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
    } catch (e) {
        res.status(401)
        res.json({ message: 'no valid token' })
        return
    }
}

export const comparePasswords = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword)
}

export const hashPassword = async (password: string) => {
    console.log(password);
    return await bcrypt.hash(password, 5);
}
