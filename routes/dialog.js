import { Router } from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { createMessage } from '../controllers/dialogs.js'

const router = new Router()

router.post('/:id', checkAuth, createMessage)

export default router