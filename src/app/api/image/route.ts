import { ImageModel } from '@/lib/mongoDB/models/images'
import connectDB from '@/lib/mongoDB/mongoDB'
import fs from 'fs' // fsモジュールをインポート
import { GridFSBucket } from 'mongodb'
import mongoose from 'mongoose'
import { NextResponse } from 'next/server'

//画像を挿入する
export async function POST(req: Request) {
  const body = await req.json()
  const { fileName, filePath } = body
  await connectDB()

  const db = mongoose.connection.db

  if (!db) {
    return NextResponse.json({ error: 'Database connection not established' }, { status: 500 })
  }

  // GridFSBucketを初期化
  const bucket = new GridFSBucket(db)

  try {
    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(fileName)
      const readStream = fs.createReadStream(filePath)

      readStream
        .pipe(uploadStream)
        .on('error', (error: unknown) => {
          console.error('Error uploading file:', error)
          reject(error)
        })
        .on('finish', async (file: { filename: string; contentType: string; metadata: object }) => {
          try {
            const image = new ImageModel({
              filename: file.filename,
              contentType: file.contentType,
              metadata: file.metadata,
            })
            await image.save()
            resolve('File uploaded and metadata saved')
          } catch (saveError) {
            reject(saveError) // 保存エラー時にもPromiseを拒否
          }
        })
    })

    await uploadPromise
    return NextResponse.json({ message: 'File uploaded successfully' })
  } catch (error) {
    console.error('Failed to upload file:', error)
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}

//画像を取得する
export async function GET(req: Request) {
  const body = await req.json()
  const { fileName } = body
  await connectDB()

  const db = mongoose.connection.db

  if (!db) {
    return NextResponse.json({ error: 'Database connection not established' }, { status: 500 })
  }

  const bucket = new GridFSBucket(db)

  try {
    const downloadStream = bucket.openDownloadStreamByName(fileName)

    const imageData: Buffer[] = []

    downloadStream.on('data', (chunk) => {
      imageData.push(chunk)
    })

    downloadStream.on('end', () => {
      const imageBuffer = Buffer.concat(imageData)
      const extension = fileName.split('.').pop()?.toLowerCase() // Get the file extension
      const contentTypeMap: Record<string, string> = {
        jpeg: 'image/jpeg',
        jpg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        bmp: 'image/bmp',
      }
      const contentType = contentTypeMap[extension] || 'application/octet-stream'

      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
        },
      })
    })

    downloadStream.on('error', (error) => {
      console.error('Error downloading file:', error)
      return NextResponse.json({ error: 'Failed to download file' }, { status: 500 })
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 })
  }
}
