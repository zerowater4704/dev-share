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
    <div className="container">
      {!isRegistering ? (
        <div>
          <h2>ログイン</h2>
          <form>
            <label>メールアドレス: </label>
            <input type="email" placeholder="email" required />
            <label>パスワード: </label>
            <input type="password" placeholder="password" required />
            <div>
              <button type="button" onClick={showRegisterForm}>
                会員登録
              </button>
              <button type="submit">ログイン</button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <h2>会員登録</h2>
          <form>
            <label>UserName: </label>
            <input type="text" placeholder="username" required />
            <label>メールアドレス: </label>
            <input type="email" placeholder="email" required />
            <label>パスワード: </label>
            <input type="password" placeholder="password" required />
            <label>学校: </label>
            <input type="text" placeholder="学校" />
            <label>希望エンジニア: </label>
            <input type="text" placeholder="例: バックエンド, フロントエンド" />
            <label>イメージ: </label>
            <input type="text" placeholder="イメージ" />
            <div>
              <button type="button" onClick={showLoginForm}>
                戻る
              </button>
              <button type="submit">登録</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
export default Login
