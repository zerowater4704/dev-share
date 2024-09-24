import { userModel } from '@/lib/mongoDB/models/user'
import connectDB from '@/lib/mongoDB/mongoDB'

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  try {
    const newUser = new userModel({
      userName: body.userName,
      userImage: body.userImage,
      email: body.email,
      password: body.password,
      school: body.scholl,
      languages: body.languages,
      position: body.position,
      githubAccount: body.githubAccount,
      xAccount: body.xAccount,
    })

    if (!newUser) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    await newUser.save()

    return new Response(JSON.stringify({ newUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
}

export async function GET(req: Request) {
  await connectDB()
  // const body = await req.json()

  try {
    const allUser = await userModel.find()

    if (!allUser) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    return new Response(JSON.stringify({ message: 'Post updated successfully', allUser }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
}
