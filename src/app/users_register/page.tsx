'use client'

import { useRouter } from 'next/navigation'
import React, { useReducer } from 'react'
import {
  initialState,
  LoginFormStateType,
  UserFormReducer,
} from '../state/reducer/FormInpurReducer'

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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        {state.errorMessage && <p className="text-red-500 text-center">{state.errorMessage}</p>}
        <h2 className="text-2xl text-black font-bold mb-4 text-center">会員登録</h2>
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
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          ))}
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
