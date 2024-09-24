import mongoose, { Schema } from 'mongoose'

const ratingSchema = new Schema({
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
})

export default mongoose.model('Rating', ratingSchema)
