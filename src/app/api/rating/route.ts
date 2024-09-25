import { ProjectModel } from '@/lib/mongoDB/models/projects'
import { ratingsModel } from '@/lib/mongoDB/models/ratings'

import connectDB from '@/lib/mongoDB/mongoDB'
import type mongoose from 'mongoose'

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  try {
    // 新しい評価を作成
    const newRating = new ratingsModel({
      addedBy: body.addedBy,
      rating: body.rating,
    })

    await newRating.save()

    // プロジェクトの取得
    const project = await ProjectModel.findById(body.project)

    // プロジェクトが見つからない場合
    if (!project) {
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
    project.rating.push(newRating._id as unknown as mongoose.Schema.Types.ObjectId)
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
