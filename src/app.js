import express from 'express'
import router from './routes'
import { resolve } from 'path'
import cors from 'cors'

import './database'
/** 
const corsOpitons = {
  origin: 'https://project-code-burger-frontend.vercel.app',
  credentials: true,
} */

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
    this.app.use(
      '/post-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    )
    this.app.use(
      '/banner-file',
      express.static(resolve(__dirname, '..', 'uploads')),
    )
  }

  routes() {
    this.app.use(router)
  }
}

export default new App().app
