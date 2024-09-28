'use client'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import type { MultiValue } from 'react-select'
import Select from 'react-select'

// 使用する開発言語のリスト
const languageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'php', label: 'PHP' },
  // 必要に応じて他の言語を追加
]

const AddPage = () => {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [language, setLanguage] = useState<MultiValue<{ value: string; label: string }>>([])
  const [startDuration, setStartDuration] = useState<Date | null>(null)
  const [endDuration, setEndDuration] = useState<Date | null>(null)
  const [link, setLink] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId')
    const storedUserName = localStorage.getItem('userName')

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

    if (!startDuration || !endDuration) {
      setErrorMessage('開始日と終了日を選択してください。')
      return
    }

    const newProject = {
      title,
      language: language.map((lang) => lang.value),
      duration: `${format(startDuration, 'yyyy-MM-dd')} から ${format(endDuration, 'yyyy-MM-dd')}`,
      link,
      addedBy: userId,
      addedByName: userName,
    }

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
        setErrorMessage(errorData.error)
        return
      }
      router.push('/')
    } catch (error) {
      setErrorMessage('プロジェクトの追加に失敗しました')
      if (error instanceof Error) {
        setErrorMessage(error.message)
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
          <Select
            isMulti
            options={languageOptions}
            value={language}
            onChange={setLanguage}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
        <div className="mt-4">
          <label className="mb-1 block">開始日:</label>
          <DatePicker
            selected={startDuration}
            onChange={(date) => setStartDuration(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full rounded border p-2"
            placeholderText="開始日を選択"
          />
        </div>
        <div className="mt-4">
          <label className="mb-1 block">終了日:</label>
          <DatePicker
            selected={endDuration}
            onChange={(date) => setEndDuration(date)}
            dateFormat="yyyy-MM-dd"
            className="w-full rounded border p-2"
            placeholderText="終了日を選択"
            minDate={startDuration || undefined}
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
        <button type="submit" className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
          追加
        </button>
      </form>
    </div>
  )
}

export default AddPage
