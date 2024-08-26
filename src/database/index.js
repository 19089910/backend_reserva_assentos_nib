import mongoose from 'mongoose'

class Database {
  constructor() {
    this.mongo()
  }

  mongo() {
    this.mongoConnetion = mongoose.connect(
      'mongodb://localhost:27017/asents_nibgc',
    )
  }
}

export default new Database()
