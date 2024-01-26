import { app } from './server.js'
import * as dotenv from 'dotenv'
import config from './config/index.js'

process.on('unhandledRejection', () => {
    console.error('There was an unhandled Recjection')
})

process.on('uncaughtException', () => {
    console.error('There was an uncaught exception')
})

dotenv.config()

app.listen(3001, () => {
    console.log(`hello on http://localhost:${config.port}`)
})
