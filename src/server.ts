import express, { Response, NextFunction } from 'express'
import router from './router.js'
import morgan from 'morgan'
import { protect } from './modules/auth.js'
import { createNewUser, signIn } from './handlers/user.js'
import { ICustomError, ICustomRequest } from './types/interfaces.js'

export const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    console.log('hello from express')
    res.status(200)
    res.json({ message: 'hello' })
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signIn)

app.use((err: ICustomError, req: ICustomRequest, res: Response, next: NextFunction) => {
    if (err.type === 'auth') {
        res.status(401).json({message: 'unauthorized'})
    } else if (err.type === 'input') {
        res.status(400).json({message: "invalid input"})
    } else {
        res.status(500).json({message: "oops thats on us"})
    }
})
