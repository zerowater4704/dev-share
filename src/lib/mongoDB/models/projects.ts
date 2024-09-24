import mongoose, { Schema } from 'mongoose'

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  projectImage: {
    type: String,
  },
  duration: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  language: {
    type: [String],
    required: true,
  },
  rating: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
})

export default mongoose.model('Project', projectSchema)
