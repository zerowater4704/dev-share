import Link from 'next/link'
import { useState } from 'react'
import LogoutButton from './LogoutButton'

const Header = () => {
  const [isHomeClicked, setIsHomeClicked] = useState(false) // ボタンクリックの状態を管理

  const handleHomeClick = () => {
    setIsHomeClicked(true) // ボタンクリック状態をセット
    setTimeout(() => setIsHomeClicked(false), 300) // 300ミリ秒後に状態をリセット
  }

  return (
    <>
      <header className="flex items-center justify-between bg-purple-700 p-4">
        <div className="flex">
          <Link href="/" className="text-2xl font-bold text-white hover:text-purple-300">
            LOGO
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/search_page"
            className="rounded-md border border-gray-300 px-4 py-2 text-white transition duration-300 hover:scale-105 hover:bg-purple-600"
          >
            検索アイコン
          </Link>
          <LogoutButton />
        </div>
      </header>

      <nav className="space-x-4 bg-purple-700 p-4">
        <Link
          href="/"
          className={`rounded-md px-2 py-1 text-white transition duration-300${
            isHomeClicked ? 'scale-110' : 'hover:scale-105'
          } hover:bg-purple-600 hover:text-purple-300`} // 拡大エフェクト
          onClick={handleHomeClick} // クリック時にアクションを追加
        >
          Home
        </Link>
        <Link
          href="/projects_page"
          className="rounded-md px-2 py-1 text-white transition duration-300 hover:scale-105 hover:bg-purple-600 hover:text-purple-300"
        >
          My Products
        </Link>
        <Link
          href="#"
          className="rounded-md px-2 py-1 text-white transition duration-300 hover:scale-105 hover:bg-purple-600 hover:text-purple-300"
        >
          お気に入り
        </Link>
        {/* 新たに「すべてのプロジェクト」ボタンを追加 */}
        <Link
          href="/projects"
          className="rounded-md px-2 py-1 text-white transition duration-300 hover:scale-105 hover:bg-purple-600 hover:text-purple-300"
        >
          すべてのプロジェクト
        </Link>
      </nav>
    </>
  )
}

export default Header
