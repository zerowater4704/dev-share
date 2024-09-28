'use server'
import { userModel } from '@/lib/mongoDB/models/user'
import connectDB from '@/lib/mongoDB/mongoDB'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: '1h',
    })

    const { password: _, ...userWithoutPassword } = user.toObject()

    return new Response(
      JSON.stringify({ message: 'ログイン成功', token, user: userWithoutPassword }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    console.error('Error logging in:', error)
    return new Response(JSON.stringify({ error: 'ログイン処理に失敗しました' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
