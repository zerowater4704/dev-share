import mongoose, { Schema } from 'mongoose'

const commentSchema: Schema = new Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const CommentsModel = mongoose.models.Comment || mongoose.model('Comment', commentSchema)
