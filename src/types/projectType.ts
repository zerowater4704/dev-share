interface ProjectType {
  _id: string
  title: string
  projectImage: string
  duration: string
  link: string
  language: string[]
  rating: RatingType[]
  comments: CommentType[]
  addedBy: UserType
}

interface RatingType {
  _id: string
  addedby: string
  rating: number
}

interface CommentType {
  _id: string
  addedBy: string
  project: string
  comment: string[]
  createdAt: Date
}
