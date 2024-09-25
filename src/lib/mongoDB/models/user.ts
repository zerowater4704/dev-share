import mongoose, { Schema } from 'mongoose'

interface UserType {
  userName: string
  userImage: string
  email: string
  password: string
  school: string
  languages: string[]
  position: string[]
  githubAccount: string
  xAccount: string
}

const userSchema = new Schema<UserType>({
  userName: { type: String, required: true },
  userImage: { type: String },
  email: { type: String, required: true, uniqued: true },
  password: { type: String, required: true, uniqued: true },
  school: { type: String },
  languages: { type: [String], required: true },
  position: { type: [String] },
  githubAccount: { type: String },
  xAccount: { type: String },
})

export const userModel = mongoose.models.User || mongoose.model('User', userSchema)
