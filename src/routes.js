import { Router } from 'express'
import UserController from './app/controllers/UserController'
import SessionController from './app/controllers/SessionController'
import ListSeatsController from './app/controllers/ListSeatsController'

import authMiddleware from './app/middlewares/auth'

const router = new Router()
router.post('/users', UserController.store)
router.post('/sessions', SessionController.store)

router.get('/seats', ListSeatsController.index)

// agora todos que tiverem a baixo disso vai passar primeiro pela validação
router.use(authMiddleware)
router.post('/seats', ListSeatsController.store)
router.delete('/seats/:id', ListSeatsController.delete)

export default router
