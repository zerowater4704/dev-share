const SearchPage = () => {
  return (
    <div>
      <div className="container mx-auto py-10">
        <input
          type="text"
          placeholder="検索"
          className="w-full rounded-lg border border-gray-300 p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* 人気のユーザーセクション */}
      <div className="container mx-auto py-10">
        <h2 className="mb-6 text-2xl font-bold">いいねが多いユーザー</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-lg">User 1</div>
          <div className="rounded-lg bg-white p-6 shadow-lg">User 2</div>
          <div className="rounded-lg bg-white p-6 shadow-lg">User 3</div>
          <div className="rounded-lg bg-white p-6 shadow-lg">User 4</div>
        </div>
      </div>

      {/* 人気のプロジェクトセクション */}
      <div className="container mx-auto py-10">
        <h2 className="mb-6 text-2xl font-bold">評価のいいプロジェクト</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-lg">Project 1</div>
          <div className="rounded-lg bg-white p-6 shadow-lg">Project 2</div>
          <div className="rounded-lg bg-white p-6 shadow-lg">Project 3</div>
          <div className="rounded-lg bg-white p-6 shadow-lg">Project 4</div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
