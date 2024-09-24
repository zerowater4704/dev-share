import { ProjectModel } from '@/lib/mongoDB/models/projects'
import connectDB from '@/lib/mongoDB/mongoDB'

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  try {
    const newProject = new ProjectModel({
      title: body.title,
      projectImage: body.projectImage,
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
