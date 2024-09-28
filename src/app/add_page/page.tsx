'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

const AddPage = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState<string>('')
  const [duration, setDuration] = useState('')
  const [link, setLink] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [languageArray, setLanguageArray] = useState<string[]>([])

  useEffect(() => {
    // ログイン時に保存されたユーザー情報を取得
    const storedUserId = localStorage.getItem('userId')
    const storedUserName = localStorage.getItem('userName')

    console.log('storedUserId:', storedUserId) // デバッグ用ログ
    console.log('storedUserName:', storedUserName) // デバッグ用ログ

    if (storedUserId) setUserId(storedUserId)
    if (storedUserName) setUserName(storedUserName)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const userId = localStorage.getItem('userId')
    const userName = localStorage.getItem('userName')
    if (!userId || !userName) {
      setErrorMessage('ユーザー情報が見つかりません。ログインしてください。')
      return
    }

    const newProject = {
      title,
      language: languageArray,
      duration,
      link,
      addedBy: userId,
      addedByName: userName,
    }

    console.log('Submitting project:', newProject)

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProject),
      })

      if (!res.ok) {
        const errorData = await res.json()
        console.error('Error from server:', errorData)
        setErrorMessage(errorData.error)
        return
      }
      router.push('/')
    } catch (error) {
      console.error('Error adding project:', error)
      setErrorMessage('プロジェクトの追加に失敗しました')

      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('プロジェクトの追加に失敗しました')
      }
    }
  }

  const handleCancel = () => {
    router.push('/projects_page')
  }

  return (
    <div className="container mx-auto p-4">
      {errorMessage && (
        <p className="text-red-500">
          {typeof errorMessage === 'string' ? errorMessage : 'エラーが発生しました'}
        </p>
      )}
      <h1 className="text-xl font-bold">プロジェクト追加</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mt-4">
          <label className="mb-1 block">タイトル:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="プロジェクトタイトル"
          />
        </div>
        <div className="mt-4">
          <label className="mb-1 block">開発言語:</label>
          <div className="flex items-center gap-1">
            <select
              // multiple
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded border p-2"
            >
              <option value="Java">Java</option>
              <option value="React">React</option>
              <option value="Next.js">Next.js</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Ruby">Ruby</option>
              <option value="PHP">PHP</option>
            </select>
            <button
              className="w-3/12 rounded-md bg-purple-700 py-2 text-white"
              disabled={language === '' ? true : false}
              onClick={() => setLanguageArray((prev) => [...prev, language])}
            >
              Add
            </button>
          </div>
          <ul className="mt-2 flex w-9/12 gap-4">
            {languageArray.map((lang, index) => (
              <li
                key={index}
                className="flex w-[100px] items-center justify-around rounded-full bg-gray-500 p-1"
              >
                <span>{lang}</span>
                <button
                  onClick={() => setLanguageArray((prev) => prev.filter((p, i) => i !== index))}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <label className="mb-1 block">開発期間:</label>
          <input
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="開発期間"
          />
        </div>
        <div className="mt-4">
          <label className="mb-1 block">アプリのリンク:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full rounded border p-2"
            placeholder="https://your-app-link.com"
          />
        </div>
        <div className="flex gap-5">
          <button
            type="submit"
            className="mt-4 w-48 rounded bg-gray-500 px-4 py-2 text-white"
            onClick={handleCancel}
          >
            キャンセル
          </button>
          <button type="submit" className="mt-4 w-48 rounded bg-blue-500 px-4 py-2 text-white">
            追加
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddPage
