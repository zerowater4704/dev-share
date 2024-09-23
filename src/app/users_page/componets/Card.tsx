const Card = ({ dummy }: { dummy: string }) => {
  return (
    <div className=" rounded-xl bg-gray-200 p-3">
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center">
          <h1 className="flex-1 border-l-4 border-purple-700 pl-2 font-bold">{dummy}</h1>
          <div className="flex gap-2">
            <button className="w-[70px] rounded-md bg-black p-1 text-white">github</button>
            <button className="w-[70px] rounded-md bg-blue-700 p-1 text-white">X</button>
          </div>
        </div>
        <div className="w-ful h-36 rounded-md bg-gray-400 text-center">image</div>

        <ul className="flex flex-col gap-1">
          <li className="border-l-2 border-purple-700 pl-2">所属：ハーバード大学</li>
          <li className="border-l-2 border-purple-700 pl-2">好きな技術：javascript</li>
          <li className="border-l-2 border-purple-700 pl-2">ポジション：フロントエンド</li>
        </ul>
      </div>
    </div>
  )
}

export default Card
