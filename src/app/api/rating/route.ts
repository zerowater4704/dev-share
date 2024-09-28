import { verifyToken } from '@/lib/jwt'
import { ProjectModel } from '@/lib/mongoDB/models/projects'
import { RatingsModel } from '@/lib/mongoDB/models/ratings'
import connectDB from '@/lib/mongoDB/mongoDB'
import { JwtPayload } from 'jsonwebtoken'

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  try {
    const existingRating = await RatingsModel.findOne({
      addedBy: body.addedBy,
      project: body.project,
    })

    // console.log('Executing findOne with query:', query)

    // const existingRating = await RatingsModel.findOne(query)

    console.log('Rating API Existing rating:', existingRating)

    if (existingRating) {
      return new Response(
        JSON.stringify({
          message: '既に評価済みです。',
        }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          },
        },
      )
    }

    const newRating = new RatingsModel({
      addedBy: body.addedBy,
      rating: body.rating,
      project: body.project,
    })

    await newRating.save()

    // プロジェクトの取得
    const project = await ProjectModel.findById(body.project)

    // プロジェクトが見つからない場合
    if (!project) {
      console.error('プロジェクトが見つかりません:', body.project)
      return new Response(JSON.stringify({ message: 'プロジェクトが見つかりません。' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    // 評価IDをプロジェクトに追加
    project.rating.push(newRating._id)
    await project.save()

    // 成功レスポンス
    return new Response(JSON.stringify({ message: '評価が追加されました。', newRating }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('エラー:', error) // ログにエラーを記録

    // エラーレスポンス
    return new Response(
      JSON.stringify({
        message: 'サーバーエラーが発生しました。後でもう一度お試しください。',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      },
    )
  }
}

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
  try {
    const decoded = verifyToken(token)
    if (!decoded) {
      return new Response(JSON.stringify({ error: 'Invalid token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const userId = (decoded as JwtPayload).id

    const projects = await ProjectModel.find({ addedBy: userId }).populate('rating')

    const projectData = projects.map((project) => {
      const ratings = project.rating || []
      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum: number, rating: any) => sum + rating.rating, 0) / ratings.length
          : 0

      return {
        _id: project._id,
        title: project.title,
        language: project.language,
        link: project.link,
        duration: project.duration,
        ratings: project.rating,
        averageRating: averageRating.toFixed(1),
      }
    })

    return new Response(JSON.stringify({ projects: projectData }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
