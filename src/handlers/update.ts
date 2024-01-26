import prisma from '../db.js'
import { Response } from 'express'
import { ICustomRequest } from '../types/interfaces.js'
import { Product, Update } from '@prisma/client'

interface IProductWithUpdates extends Product {
    Update: Update[]
}

export const getOneUpdate = async (req: ICustomRequest, res: Response) => {
    const update = await prisma.update.findFirst({
        where: {
            id: req.params.id,
        },
    })

    res.json({ data: update })
}

export const getUpdates = async (req: ICustomRequest, res: Response) => {
    const product = await prisma.product.findMany({
        where: {
            belongsToId: req.user?.id,
        },
        include: {
            Update: true,
        },
    })

    const updates = product.reduce(
        (allUpdates: Update[], product): Update[] => {
            return [...allUpdates, ...product.Update]
        },
        []
    )
    res.json({ data: updates })
}

export const createUpdate = async (req: ICustomRequest, res: Response) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId,
        },
    })

    if (!product) {
        return res.json({ message: 'nope' })
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title as string,
            body: req.body.body,
            product: {connect: {id: product.id}}
        },
    })

    res.json({ data: update })
}

export const updateUpdate = async (req: ICustomRequest, res: Response) => {
    const product = await prisma.product.findMany({
        where: {
            belongsToId: req.user?.id,
        },
        include: {
            Update: true,
        },
    })

    const updates = product.reduce(
        (allUpdates: Update[], product): Update[] => {
            return [...allUpdates, ...product.Update]
        },
        []
    )

    const match = updates.find((update) => update.id === req.params.id)

    if (!match) {
        //handle error
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
    })

    res.json({ data: updatedUpdate })
}

export const deleteUpdate = async (req: ICustomRequest, res: Response) => {
    const product = await prisma.product.findMany({
        where: {
            belongsToId: req.user?.id,
        },
        include: {
            Update: true,
        },
    })

    const updates = product.reduce(
        (allUpdates: Update[], product): Update[] => {
            return [...allUpdates, ...product.Update]
        },
        []
    )

    const match = updates.find((update) => update.id === req.params.id)

    if (!match) {
        //handle error
    }

    const deletedUpdate = await prisma.update.delete({
        where: {
            id: req.params.id,
        },
    })

    res.json({ data: deletedUpdate })
}
