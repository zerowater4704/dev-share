import mongoose from 'mongoose'

const mongoURL = process.env.MONGO_URL
// const VercelMongoURI = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL as string)
    console.log('succecc mongoDB')

    if (mongoose.models) {
      console.log('Comment model is registered: ', mongoose.models)
    } else {
      console.error('Comment model is not registered: ', mongoose.models)
    }
  } catch (err) {
    console.log('Failure:Unconnected to MongoDB')
    throw new Error()
  }
}

export default connectDB
