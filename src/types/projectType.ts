interface ProjectType {
  _id: string
  title: string
  projectImage: string
  duration: string
  link: string
  language: string[]
  rating: RatingType[]
  comments: CommentType[]
  addedBy: string
}

interface RatingType {
  _id: string
  addedby: UserType
  rating: number[]
}

interface CommentType {
  _id: string
  addedBy: UserType
  project: ProjectType
  comment: string[]
  createdAt: Date
}
