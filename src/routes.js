import { Router, response } from 'express'

const router = new Router()
router.get('/', (request, response) => {
  return response.json({ message: 'Hello lucas' })
})

export default router
