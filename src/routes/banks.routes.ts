import express from 'express'

import { handler } from './../handlers/banks.handler'

const router = express.Router()
router.get('/:id', handler)

export default router
