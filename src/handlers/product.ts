import { NextFunction, Response } from 'express'
import prisma from '../db'
import { ICustomRequest } from '../types/interfaces'
import { Product, User } from '@prisma/client'

interface IUserWithProducts extends User {
    Product: Product[]
}

export const getProducts = async (req: ICustomRequest, res: Response) => {
    const user: IUserWithProducts | null = await prisma.user.findUnique({
        where: {
            id: req.user?.id,
        },
        include: {
            Product: true,
        },
    })

    if (!user) {
        console.error('No user found and products found.')
        return
    }

    res.json({ data: user.Product })
}

export const getOneproduct = async (req: ICustomRequest, res: Response, next: NextFunction) => {
    try {
        const id = req.params.id

        const product = await prisma.product.findFirst({
            where: {
                id,
                belongsToId: req.user?.id,
            },
        })

        res.json({ data: product })
    } catch(e) {
        next(e);
    }
}

export const createProduct = async (req: ICustomRequest, res: Response) => {
    if (!req.user) {
        return;
    }
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id,
        },
    })

    res.json({ data: product })
}

export const updateProduct = async (req: ICustomRequest, res: Response) => {
    if (!req.user) {
        return
    }
    const updated = await prisma.product.update({
        where: {
            id: req.params.id,
            belongsToId: req.user.id,
        },
        data: {
            name: req.body.name,
        },
    })

    res.json({
        data: updated,
    })
}

export const deleteProduct = async (req: ICustomRequest, res: Response) => {
    if (!req.user) {
        return
    }
    const deleted = await prisma.product.delete({
        where: {
            id: req.params.id,
            belongsToId: req.user.id,
        },
    })

    res.json({
        data: deleted,
    })
}
