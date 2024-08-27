import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password_hash: { type: String },
  admin: { type: Boolean },
})

// Definindo um campo virtual para a senha
UserSchema.virtual('password')
  .set(function (password) {
    this._password = password
    // Garante que o password_hash será atualizado ao definir a senha
    this.password_hash = bcrypt.hashSync(password, 10)
  })
  .get(function () {
    return this._password
  })

// Método para hash de senha antes de salvar !redundância
UserSchema.pre('save', async function (next) {
  // Verifica se a senha foi modificada
  if (this.isModified('password' && !this._password)) {
    this.password_hash = await bcrypt.hash(this.password, 10)
  }
  next()
})

// Método para comparar a senha do login com a armazenada
UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password_hash)
}

export default mongoose.model('User', UserSchema)
