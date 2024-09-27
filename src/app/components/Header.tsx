import Link from 'next/link'
import LogoutButton from './LogoutButton'

const Header = () => {
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
            className="rounded-md border border-gray-300 px-4 py-2 text-white"
          >
            検索アイコン
          </Link>
          {/* <Link
            href="/users_login"
            className=" text-white hover:text-purple-300 px-4 py-2 rounded-md"
          >
            ログアウト
          </Link> */}
          <LogoutButton />
        </div>
      </header>

      <nav className="space-x-4 bg-purple-700 p-4">
        <Link href="/" className="rounded-md px-2 py-1 text-white hover:text-purple-300">
          Home
        </Link>
        <Link
          href="/projects_page"
          className="rounded-md px-2 py-1 text-white hover:text-purple-300"
        >
          My Products
        </Link>
        <Link href="#" className="rounded-md px-2  py-1 text-white hover:text-purple-300">
          お気に入り
        </Link>
      </nav>
    </>
  )
}

export default Header
