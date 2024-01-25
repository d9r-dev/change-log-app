import { Request, Response } from 'express'
import prisma from '../db'
import { comparePasswords, createJWT, hashPassword } from '../modules/auth'

export const createNewUser = async (req: Request, res: Response) => {
    let user
    try {
        user = await prisma.user.create({
            data: {
                username: req.body.username,
                password: await hashPassword(req.body.password),
            },
        })
    } catch (e) {
        console.error(e)
    } finally {
        if (user) {
            const token = createJWT(user)
            res.status(200)
            res.json({ token })
        }
    }
}

export const signIn = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: {
            username: req.body.username,
        },
    })

    if (!user) {
        res.status(401)
        res.json({ message: 'Username and password do not match!' })
        return
    }

    const isValid = await comparePasswords(req.body.password, user.password)

    if (!isValid) {
        res.json(401)
        res.json({ message: 'Username and password do not match!' })
    }

    const token = createJWT(user)
    res.json({ token })
}
