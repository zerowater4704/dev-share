import mongoose, { Schema } from 'mongoose'

interface ProjectType {
  title: string
  projectImage: string
  duration: string
  link: string
  language: string[]
  rating: mongoose.Schema.Types.ObjectId[]
  comments: mongoose.Schema.Types.ObjectId[]
  addedBy: mongoose.Schema.Types.ObjectId
}

const projectSchema = new Schema<ProjectType>({
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

export const ProjectModel = mongoose.models.Project || mongoose.model('Project', projectSchema)
