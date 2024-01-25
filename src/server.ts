import express from 'express'
import router from './router.js'
import morgan from 'morgan'
import { protect } from './modules/auth.js'
import { createNewUser, signIn } from './handlers/user.js'

export const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    console.log('hello from express')
    res.status(200)
    res.json({ message: 'hello' })
})

app.use('/api', protect, router)

app.post('/user', createNewUser)
app.post('/signin', signIn)
