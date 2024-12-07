import { Router } from 'express'

// import UserController from './app/controllers/UserController'
// import SessionController from './app/controllers/SessionController'
import ListSeatsController from './app/controllers/ListSeatsController'
import AdminOperationsController from './app/controllers/AdminOperationsController'

import multer from 'multer'
import multerConfig from './config/multer'
// import authMiddleware from './app/middlewares/auth'

const uploads = multer(multerConfig)
const router = new Router()
// router.post('/users', UserController.store)
// router.post('/sessions', SessionController.store)

router.get('/seats', ListSeatsController.index)

// agora todos que tiverem a baixo disso vai passar primeiro pela validação
// router.use(authMiddleware)

router.post('/seats', ListSeatsController.store)
router.delete('/seats/:id', ListSeatsController.delete)

router.post(
  '/shows',
  uploads.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'poster', maxCount: 1 },
  ]),
  AdminOperationsController.store,
)
router.get('/shows', AdminOperationsController.index)
router.post(
  '/shows/:id',
  uploads.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'poster', maxCount: 1 },
  ]),
  AdminOperationsController.update,
)

export default router
