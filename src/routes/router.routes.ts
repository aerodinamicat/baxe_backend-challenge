import express from 'express'

import banksRouter from './banks.routes'

export default function routerAPI(app) {
  const routerAPIv1 = express.Router()
  app.use('/api/v1', routerAPIv1)

  routerAPIv1.use('/banks', banksRouter)
}
