'use server'
import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization')

  if (!authHeader) {
    return NextResponse.json({ error: 'Token is missing' }, { status: 401 })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)
    return NextResponse.json({ message: 'Token is valid', user: decoded })
  } catch (error) {
    return NextResponse.json({ error: 'Token is invalid' }, { status: 401 })
  }
}
