import prisma from '../db'
import { Response } from 'express'
import { ICustomRequest } from '../types/interfaces'
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
    
    const updates = product.reduce((allUpdates: Update[], product): Update[] => {
        return [...allUpdates, ...product.Update];
    }, [])
    res.json({data: updates})
}
