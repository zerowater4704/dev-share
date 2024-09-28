'use client'

import { useRouter } from 'next/navigation'
import React, { useReducer } from 'react'
import type { LoginFormStateType } from '../state/reducer/LoginFormInpurReducer'
import { initialState, UserFormReducer } from '../state/reducer/LoginFormInpurReducer'

const Register = () => {
  const [state, dispatch] = useReducer(UserFormReducer, initialState)
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || '登録に失敗しました。')
      }

      router.push('/users_login')
    } catch (err) {
      const error = err as Error
      console.error('エラー:', error)
      dispatch({ type: 'SET_DATA', name: 'errorMessage', value: error.message }) // エラーメッセージを設定
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        {state.errorMessage && <p className="text-center text-red-500">{state.errorMessage}</p>}
        <h2 className="mb-4 text-center text-2xl font-bold text-black">会員登録</h2>
        <form className="space-y-4" onSubmit={handleRegister}>
          {/* フォームフィールド */}
          {[
            {
              label: 'UserName',
              type: 'text',
              field: 'userName' as keyof LoginFormStateType,
              placeholder: 'username',
              required: true,
            },
            {
              label: 'メールアドレス',
              type: 'email',
              field: 'email' as keyof LoginFormStateType,
              placeholder: 'email',
              required: true,
            },
            {
              label: 'パスワード',
              type: 'password',
              field: 'password' as keyof LoginFormStateType,
              placeholder: 'password',
              required: true,
            },
            {
              label: '学校',
              type: 'text',
              field: 'school' as keyof LoginFormStateType,
              placeholder: '学校',
            },
            {
              label: '希望エンジニア',
              type: 'text',
              field: 'languages' as keyof LoginFormStateType,
              placeholder: '例: バックエンド, フロントエンド',
            },
            {
              label: 'イメージ',
              type: 'text',
              field: 'userImage' as keyof LoginFormStateType,
              placeholder: 'イメージ',
            },
            {
              label: 'GitHub',
              type: 'text',
              field: 'githubAccount' as keyof LoginFormStateType,
              placeholder: 'GitHub アカウント',
            },
            {
              label: 'X',
              type: 'text',
              field: 'xAccount' as keyof LoginFormStateType,
              placeholder: 'X アカウント',
            },
          ].map(({ label, type, field, placeholder, required }) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700">{label}:</label>
              <input
                type={type}
                value={state[field] || ''} // null の場合は空文字列を設定
                onChange={(e) => dispatch({ type: 'SET_DATA', name: field, value: e.target.value })} // リデューサーを使用してフィールドを更新
                placeholder={placeholder}
                required={required}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full rounded-md bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
          >
            登録
          </button>
          <button
            type="button"
            onClick={() => router.push('/users_login')}
            className="mt-2 w-full rounded-md bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
          >
            ログインへ
          </button>
        </form>
      </div>
    </div>
  )
}
export default Register
