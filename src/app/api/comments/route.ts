'use server'
import { CommentsModel } from '@/lib/mongoDB/models/comments'
import { ProjectModel } from '@/lib/mongoDB/models/projects'
import connectDB from '@/lib/mongoDB/mongoDB'

import type mongoose from 'mongoose'

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()

  try {
    const newComment = new CommentsModel({
      addedBy: body.addedBy,
      project: body.project,
      comment: body.comment,
    })

    await newComment.save()

    const project = await ProjectModel.findById(body.project)
      .populate('addedBy', 'userName')
      .populate({
        path: 'comments', // commentsをpopulate
        populate: {
          path: 'addedBy', // コメントのaddedByもpopulate
          select: 'userName', // userNameだけを選択
        },
      })

    // プロジェクト取得時の確認
    console.log('Fetched project:', project)

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

    project.comments.push(newComment as mongoose.Schema.Types.ObjectId)
    await project.save()

    return new Response(JSON.stringify({ message: 'コメントが作成されました。', newComment }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Error details:', error)
    return new Response(JSON.stringify({ message: 'コメント作成に失敗しました。' }), {
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
  const { searchParams } = new URL(req.url)
  const projectId = searchParams.get('project')

  if (!projectId) {
    return new Response(JSON.stringify({ message: 'プロジェクトIDが指定されていません。' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  try {
    const allComment = await CommentsModel.find({ project: projectId }).populate(
      'addedBy',
      'userName',
    )

    if (!allComment) {
      return new Response(JSON.stringify({ message: 'コメントが見つかりません。' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    return new Response(
      JSON.stringify({ message: 'コメント取得に成功しました。', comments: allComment }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      },
    )
  } catch (error) {
    return new Response(JSON.stringify({ message: 'コメント取得に失敗しました。' }), {
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
    const comment = await CommentsModel.findByIdAndUpdate(body._id, { $set: body }, { new: true })

    if (!comment) {
      return new Response(JSON.stringify({ message: 'コメントが見つかりません。' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'PUT',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    return new Response(JSON.stringify({ message: 'コメントが更新されました。', comment }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: 'コメント更新に失敗しました。' }), {
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
    return new Response(JSON.stringify({ message: 'コメントが見つかりません。' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }

  try {
    const comment = await CommentsModel.findByIdAndDelete(id)

    if (!comment) {
      return new Response(JSON.stringify({ message: 'コメントが見つかりません。' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Methods': 'DELETE',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    return new Response(JSON.stringify({ message: 'コメントが削除されました。' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  } catch (error) {
    return new Response(JSON.stringify({ message: 'コメント削除に失敗しました。' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'DELETE',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })
  }
}
