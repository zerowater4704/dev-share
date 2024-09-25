import { userModel } from '@/lib/mongoDB/models/user'
import connectDB from '@/lib/mongoDB/mongoDB'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  const { email, password } = body

  try {
    const user = await userModel.findOne({ email })

    if (!user) {
      return new Response(
        JSON.stringify({ error: 'メールアドレスまたはパスワードが間違っています' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        },
      )
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'パスワードが間違っています' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ message: 'ログイン成功', user }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error logging in:', error)
    return new Response(JSON.stringify({ error: 'ログイン処理に失敗しました' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
