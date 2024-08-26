// src/app/schemas/User.js
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password_hash: { type: String },
  admin: { type: Boolean },
})

// Definindo um campo virtual para a senha
UserSchema.virtual('password')
  .set(function (password) {
    this._password = password
  })
  .get(function () {
    return this._password
  })

// Método para hash de senha antes de salvar
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password_hash = await bcrypt.hash(this.password, 10)
  }
  next()
})

// Método para comparar a senha do login com a armazenada
UserSchema.methods.comparePassword = (candidatePassword) => {
  return bcrypt.compare(candidatePassword, this.password_hash)
}

export default mongoose.model('User', UserSchema)
