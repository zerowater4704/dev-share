import mongoose, { Schema } from 'mongoose'

const imageSchema = new Schema({
  filename: String,
  contentType: String,
  metadata: Object,
})

export const ImageModel = mongoose.models.Image || mongoose.model('Image', imageSchema)
