import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'

import authMiddleware from './app/middlewares/auth'

const router = new Router()
router.post('/users', UserController.store)
router.post('/sessions', SessionController.store)
// agora todos que tiverem a baixo disso vai passar primeiro pela validação
router.use(authMiddleware)

export default router
