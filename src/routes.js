/**
 * PRECISA TA FUNCIONADO PARA PROIBIR FAZER QUAL QUER COISA,
 * TA MUITO SUCETIVEL A HAKERS SEM PROTEÇÃO NEM UMA DE ROTAS
 * NO FORNT TA OK.
 */
// import authMiddleware from './app/middlewares/auth'

import { Router } from 'express'

import ListSeatsController from './app/controllers/ListSeatsController'
import AdminOperationsController from './app/controllers/AdminOperationsController'
import FirebaseSessionController from './app/controllers/FirebaseSessionController'

import multer from 'multer'
import multerConfig from './config/multer'

const uploads = multer(multerConfig)
const router = new Router()

router.post('/set-admin', FirebaseSessionController.store)
router.get('/seats', ListSeatsController.index)
router.get('/shows', AdminOperationsController.index)

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

router.put(
  '/shows/:id',
  uploads.fields([
    { name: 'banner', maxCount: 1 },
    { name: 'poster', maxCount: 1 },
  ]),
  AdminOperationsController.update,
)

export default router
