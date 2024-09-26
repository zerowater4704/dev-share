import Link from 'next/link'

const Header = () => {
  return (
    <>
      <header className="bg-purple-700 p-4 flex justify-between items-center">
        <div className="flex">
          <Link href="/" className="text-2xl font-bold text-white hover:text-purple-300">
            LOGO
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link
            href="/search_page"
            className="px-4 py-2 border border-gray-300 rounded-md text-white"
          >
            検索アイコン
          </Link>
          <Link
            href="/users_login"
            className=" text-white hover:text-purple-300 px-4 py-2 rounded-md"
          >
            ログアウト
          </Link>
        </div>
      </header>

      <nav className="space-x-4 p-4 bg-purple-700">
        <Link href="/" className="text-white hover:text-purple-300 px-2 py-1 rounded-md">
          Home
        </Link>
        <Link
          href="/projects_page"
          className="text-white hover:text-purple-300 px-2 py-1 rounded-md"
        >
          My Products
        </Link>
        <Link href="#" className="text-white hover:text-purple-300  px-2 py-1 rounded-md">
          お気に入り
        </Link>
      </nav>
    </>
  )
}

export default Header
