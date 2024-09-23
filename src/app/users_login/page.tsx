'use client'

import { useState } from 'react'

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false)

  const showRegisterForm = () => {
    setIsRegistering(true)
  }

  const showLoginForm = () => {
    setIsRegistering(false)
  }
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {!isRegistering ? (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-black text-center">ログイン</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">メールアドレス:</label>
                <input
                  type="email"
                  placeholder="email"
                  required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">パスワード:</label>
                <input
                  type="password"
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
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">UserName:</label>
                <input
                  type="text"
                  placeholder="username"
                  required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">メールアドレス:</label>
                <input
                  type="email"
                  placeholder="email"
                  required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">パスワード:</label>
                <input
                  type="password"
                  placeholder="password"
                  required
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">学校:</label>
                <input
                  type="text"
                  placeholder="学校"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">希望エンジニア:</label>
                <input
                  type="text"
                  placeholder="例: バックエンド, フロントエンド"
                  className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">イメージ:</label>
                <input
                  type="text"
                  placeholder="イメージ"
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
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
export default Login
