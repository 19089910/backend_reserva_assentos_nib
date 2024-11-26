import express from 'express'
import router from './routes'
import './database' // Isso inicializa a conexão com o banco de dados

class App {
  constructor() {
    this.app = express()
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
