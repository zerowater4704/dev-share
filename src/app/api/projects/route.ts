import { CommentsModel } from '@/lib/mongoDB/models/comments'
import { ProjectModel } from '@/lib/mongoDB/models/projects'
import connectDB from '@/lib/mongoDB/mongoDB'

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  try {
    const newProject = new ProjectModel({
      title: body.title,
      projectImage: body.projectImage,
      duration: body.duration,
      link: body.link,
      language: body.language, // ここは文字列の配列を期待しています
      rating: body.rating,
      comments: body.comments,
      addedBy: body.addedBy,
    })

    if (!newProject) {
      return new Response(JSON.stringify({ error: 'Post not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    await newProject.save()

    return new Response(JSON.stringify({ message: 'Post updated successfully', newProject }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Server error:', error)
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

export async function GET() {
  await connectDB()

  try {
    const projects = await ProjectModel.find().populate('comments').populate('rating')
    const comments = await CommentsModel.find()

    // プロジェクト取得後の確認
    console.log('Fetched projects:', projects)

    if (!projects || projects.length === 0) {
      return new Response(JSON.stringify({ error: 'プロジェクトがありません。' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }
    return new Response(JSON.stringify({ projects, comments }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
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

  try {
    const project = await ProjectModel.findByIdAndUpdate(body._id, { $set: body }, { new: true })

    if (!project) {
      return new Response(JSON.stringify({ error: 'プロジェクトが見つかりません。' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'PUT',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }
    return new Response(JSON.stringify({ message: 'プロジェクトが更新されました。', project }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'PUT',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
}

export async function DELETE(req: Request) {
  await connectDB()

  const url = new URL(req.url)
  const id = url.searchParams.get('id')

  if (!id) {
    return new Response(JSON.stringify({ error: 'IDが見つかりません。' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  try {
    const project = await ProjectModel.findByIdAndDelete(id)

    if (!project) {
      return new Response(JSON.stringify({ error: 'プロジェクトが見つかりません。' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    return new Response(JSON.stringify({ message: 'プロジェクトが削除されました。' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
}
