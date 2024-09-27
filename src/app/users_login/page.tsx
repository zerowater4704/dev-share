'use client'

import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const router = useRouter()
  const { checkToken } = useAuth()

  useEffect(() => {
    checkToken()
  }, [checkToken])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      console.log(errorData)
      setErrorMessage(errorData.error)
      return
    }

    const data = await res.json()

    localStorage.setItem('token', data.token)
    localStorage.setItem('userId', data.user._id)
    localStorage.setItem('userName', data.user.userName)
    console.log(data)
    router.push('/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
        <h2 className="mb-4 text-center text-2xl font-bold text-black">ログイン</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">メールアドレス:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">パスワード:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
          >
            ログイン
          </button>
          <button
            type="button"
            onClick={() => router.push('/users_register')}
            className="mt-2 w-full rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            会員登録
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
