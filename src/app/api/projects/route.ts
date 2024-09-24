import connectDB from '@/lib/mongoDB/mongoDB'

export async function POST(req: Request) {
  await connectDB()
}
