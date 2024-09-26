'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const router = useRouter()

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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <h2 className="text-2xl font-bold mb-4 text-black text-center">ログイン</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">メールアドレス:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email"
              required
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 w-full"
          >
            ログイン
          </button>
          <button
            type="button"
            onClick={() => router.push('/users_register')}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-full mt-2"
          >
            会員登録
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
