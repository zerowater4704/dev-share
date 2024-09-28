import { userModel } from '@/lib/mongoDB/models/user'
import connectDB from '@/lib/mongoDB/mongoDB'

export async function GET() {
  await connectDB()

  try {
    const users = await userModel.find().populate('projects') // プロジェクトを含めてユーザーを取得

    if (!users) {
      return new Response(JSON.stringify({ error: 'Users not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
