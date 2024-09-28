import { verifyToken } from '@/lib/jwt'
import { CommentsModel } from '@/lib/mongoDB/models/comments'
import { ProjectModel } from '@/lib/mongoDB/models/projects'
import connectDB from '@/lib/mongoDB/mongoDB'
import { JwtPayload } from 'jsonwebtoken'

export async function GET(req: Request) {
  await connectDB()

  const authHeader = req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const token = authHeader.split(' ')[1]
  console.log('Received token:', token)
  try {
    const decoded = verifyToken(token)
    console.log('Decoded token:', decoded)
    if (!decoded) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // JWTトークンからユーザーIDを取得
    const userId = (decoded as JwtPayload).id

    // ユーザーIDに基づいてプロジェクトを取得
    const projects = await ProjectModel.find({ addedBy: userId })
      .populate('addedBy', 'userName')
      .populate({
        path: 'comments',
        populate: { path: 'addedBy', select: 'userName' }, // コメントのaddedByをpopulate
      })
    const comments = await CommentsModel.find()

    if (!projects || projects.length === 0) {
      return new Response(JSON.stringify({ error: 'No projects found for this user' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ projects, comments }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
