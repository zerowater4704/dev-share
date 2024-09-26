'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Register = () => {
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [school, setSchool] = useState('')
  const [languages, setLanguages] = useState('')
  const [githubAccount, setGithubAccount] = useState('')
  const [xAccount, setXAccount] = useState('')
  const [userImage, setUserImage] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null) // 型をstring | nullに設定
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/users', {
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

      router.push('/users_login') // 登録後にログインページへリダイレクト
    } catch (err) {
      const error = err as Error // エラーをError型にキャスト
      console.error('エラー:', error)
      setErrorMessage(error.message) // エラーメッセージを設定
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
        <h2 className="text-2xl text-black font-bold mb-4 text-center">会員登録</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          {/* フォームフィールド */}
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
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 w-full"
          >
            登録
          </button>
          <button
            type="button"
            onClick={() => router.push('/users_login')}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 w-full mt-2"
          >
            ログインへ
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
