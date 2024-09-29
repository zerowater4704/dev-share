'use client'
import Link from 'next/link'
import { useState } from 'react'
import LogoutButton from './LogoutButton'

const Header = () => {
  const [isHomeClicked, setIsHomeClicked] = useState(false)

  const handleHomeClick = () => {
    setIsHomeClicked(true)
    setTimeout(() => setIsHomeClicked(false), 300)
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
          <LogoutButton />
        </div>
      </header>

      <nav className="space-x-4 bg-purple-700 p-4">
        <Link
          href="/"
          className={`rounded-md px-2 py-1 text-white transition duration-300 transform ${
            isHomeClicked ? 'scale-110' : ''
          } hover:scale-105 hover:bg-purple-600 hover:text-yellow-300 hover:rotate-3 hover:shadow-lg border-2 border-transparent hover:border-yellow-300`} // 拡大、回転、ボーダー
          onClick={handleHomeClick}
        >
          Home
        </Link>
        <Link
          href="/projects_page"
          className="rounded-md px-2 py-1 text-white transition duration-300 transform hover:scale-105 hover:bg-purple-600 hover:text-yellow-300 hover:rotate-3 hover:shadow-lg border-2 border-transparent hover:border-yellow-300"
        >
          My Products
        </Link>
        <Link
          href="#"
          className="rounded-md px-2 py-1 text-white transition duration-300 transform hover:scale-105 hover:bg-purple-600 hover:text-yellow-300 hover:rotate-3 hover:shadow-lg border-2 border-transparent hover:border-yellow-300"
        >
          お気に入り
        </Link>
        <Link
          href="/projects"
          className="rounded-md px-2 py-1 text-white transition duration-300 transform hover:scale-105 hover:bg-purple-600 hover:text-yellow-300 hover:rotate-3 hover:shadow-lg border-2 border-transparent hover:border-yellow-300"
        >
          すべてのプロジェクト
        </Link>
      </nav>
    </>
  )
}

export default Header
