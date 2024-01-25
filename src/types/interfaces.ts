import { Request } from 'express'
import { User } from '@prisma/client'

export interface ICustomRequest extends Request {
    user?: User
}

