import { ProjectModel } from '@/lib/mongoDB/models/projects'
import connectDB from '@/lib/mongoDB/mongoDB'

export async function PUT(req: Request) {
  await connectDB()
  const body = await req.json()
  const projectId = body.projectId
  const newRating = body.newRating

  try {
    if (!projectId) {
      return new Response(JSON.stringify({ error: 'Project ID is required' }), {
        status: 400, // Bad Request
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    // ProjectのIDで検索し、ratingフィールドに新しい評価を追加
    const res = await ProjectModel.findOneAndUpdate(
      { _id: projectId }, // 検索クエリ: projectIdで検索
      { $push: { rating: newRating } }, // rating配列に新しい評価を追加
      { new: true }, // 更新後のデータを返す
    )

    if (!res) {
      return new Response(JSON.stringify({ error: 'Project not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }

    // 成功時のレスポンス
    return new Response(
      JSON.stringify({ message: 'Success: Data added successfully', data: res }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
  } catch (error) {
    // エラーハンドリング
    return new Response(JSON.stringify({ error }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

// export async function DELETE(req: Request) {
//   await connectDB()
//   const url = new URL(req.url)
//   const projectId = url.searchParams.get('id')
//   const rateId = url.searchParams.get('rateId')

//   try {
//     const res = await ProjectModel.findByIdAndUpdate(
//       projectId,
//       {
//         $pull: { rating: { _id: rateId } },
//       },
//       { new: true }
//     );

//     if (!res) {
//       return new Response(JSON.stringify({ error: 'Post not found' }), {
//         status: 404,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       })
//     }

//     return new Response('Success: Data added successfully', {
//       status: 200,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//   } catch (error) {
//     return new Response(JSON.stringify({ error }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//   }
// }
