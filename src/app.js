import express from 'express'
import router from './routes'
import cors from 'cors'

import './database'

class App {
  constructor() {
    this.app = express()
    this.app.use(cors())
    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
  }

  routes() {
    this.app.use(router)
  }
}

export default new App().app
