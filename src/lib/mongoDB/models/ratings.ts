import mongoose, { Schema } from 'mongoose'

interface RatingType {
  addedBy: mongoose.Schema.Types.ObjectId
  rating: number
}

const ratingSchema = new Schema<RatingType>({
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

export const ratingsModel = mongoose.models.Rating || mongoose.model('Rating', ratingSchema)
