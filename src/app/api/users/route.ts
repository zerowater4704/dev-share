import { userModel } from '@/lib/mongoDB/models/user'
import connectDB from '@/lib/mongoDB/mongoDB'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  try {
    const hashedPassword = await bcrypt.hash(body.password, 10)

    const newUser = new userModel({
      userName: body.userName,
      userImage: body.userImage,
      email: body.email,
      password: hashedPassword,
      school: body.school,
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

export async function PUT(req: Request) {
  await connectDB()
  const body = await req.json()
  const id = body._id

  try {
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10)
      body.password = hashedPassword
    }

    const updateUser = await userModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: body,
      },
      { new: true },
    )

    if (!updateUser) {
      return new Response(JSON.stringify({ error: 'user not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ message: 'Post updated successfully', updateUser }), {
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

export async function DELETE(req: Request) {
  await connectDB()
  const body = await req.json()

  // URLクエリパラメータからuserIdを取得
  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return new Response('Error: Missing userId', { status: 400 })
  }

  try {
    const deletePost = await userModel.findByIdAndDelete({ _id: id })

    return new Response(JSON.stringify(deletePost), {
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
