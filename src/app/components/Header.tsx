const Header = () => {
  return (
    <header className="bg-purple-700">
      <div>
        <button>Home</button>
        <button>My Products</button>
        <button>お気に入り</button>
      </div>
      <div>
        <input type="text" placeholder="検索バー" />
        <button>ログイン</button>
      </div>
    </header>
  )
}

export default Header
