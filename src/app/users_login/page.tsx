'use client'

import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import styles from './Login.module.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [showLoginBox, setShowLoginBox] = useState(false)
  const [showImage, setShowImage] = useState(true) // 画像の表示状態
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
    <div className="relative flex min-h-screen items-center justify-center bg-white p-6">
      {' '}
      {/* 背景を白に変更 */}
      {/* {showImage && (
        <Image
          src="/—Pngtree—tablet device mockup_7557827.png"
          alt="Background"
          width={800}
          height={600}
          className="absolute z-0 cursor-pointer" // 画像をクリック可能に
          style={{ objectFit: 'contain', maxWidth: '80%', maxHeight: '80%' }}
          onClick={() => setShowImage(false)} // 画像クリックで非表示に
        />
      )} */}
      <div
        className={styles.titleContainer}
        onClick={() => {
          setShowImage(false) // タイトルをクリックしたら画像を非表示にする
          setShowLoginBox(true) // ログインボックスを表示
        }}
      >
        <h1 className="text-center text-4xl">
          {'DevShare'.split('').map((char, index) => (
            <span
              key={index}
              className={styles.dropAnimation}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {char}
            </span>
          ))}
        </h1>
      </div>
      {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>}
      {showLoginBox && (
        <div className={styles.loginBox}>
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
      )}
    </div>
  )
}

export default Login
