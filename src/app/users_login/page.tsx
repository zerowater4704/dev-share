'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [school, setSchool] = useState('')
  const [languages, setLanguages] = useState('')
  const [githubAccount, setGithubAccount] = useState('')
  const [xAccount, setXAccount] = useState('')
  const [userImage, setUserImage] = useState('')
  const [image, setImage] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const router = useRouter()

  const showRegisterForm = () => {
    setIsRegistering(true)
  }

  const showLoginForm = () => {
    setIsRegistering(false)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName,
          userImage,
          email,
          password,
          school,
          languages,
          githubAccount,
          xAccount,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '登録に失敗しました。')
      }
    } catch (error) {
      console.error('エラー:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    const res = await fetch('api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (!res.ok) {
      const errorData = await res.json()
      setErrorMessage(errorData.error)
      return
    }
    router.push('/users_page')
    const loginData = await res.json()
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        {!isRegistering ? (
          <div>
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
              <div className="flex flex-col space-y-3 justify-between items-center">
                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 w-1/2"
                >
                  ログイン
                </button>
                <button
                  type="button"
                  onClick={showRegisterForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-1/2"
                >
                  会員登録
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl text-black font-bold mb-4 text-center">会員登録</h2>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div>
                <label className="block text-sm font-medium text-gray-700">UserName:</label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="username"
                  required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
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
              <div>
                <label className="block text-sm font-medium text-gray-700">学校:</label>
                <input
                  type="text"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  placeholder="学校"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">希望エンジニア:</label>
                <input
                  type="text"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  placeholder="例: バックエンド, フロントエンド"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">イメージ:</label>
                <input
                  type="text"
                  value={userImage}
                  onChange={(e) => setUserImage(e.target.value)}
                  placeholder="イメージ"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">GitHub:</label>
                <input
                  type="text"
                  value={githubAccount}
                  onChange={(e) => setGithubAccount(e.target.value)}
                  placeholder="GitHub アカウント"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">X:</label>
                <input
                  type="text"
                  value={xAccount}
                  onChange={(e) => setXAccount(e.target.value)}
                  placeholder="X アカウント"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex justify-between items-center space-x-3">
                <button
                  type="button"
                  onClick={showLoginForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-1/2"
                >
                  戻る
                </button>
                <button
                  type="submit"
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 w-1/2"
                >
                  登録
                </button>
              </div>
              {errorMessage && (
                <div className="text-red-500 mt-2">
                  {typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage)}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
export default Login
