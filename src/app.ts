import express from 'express'
import routerAPI from './routes/router.routes'

const app = express()
routerAPI(app)

export default app