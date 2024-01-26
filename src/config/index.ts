import merge from 'lodash.merge'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const stage = process.env.STAGE || 'local'

let envConfig

if (stage === 'production') {
    envConfig = import('./prod.js')
} else if (stage === 'testing') {
    envConfig = import("./testing.js")
} else {
    envConfig = import('./local.js')
}

export default merge({
    stage,
    env: process.env.NODE_ENV,
    port: 3001,
}, envConfig)

