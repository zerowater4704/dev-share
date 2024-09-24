import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'
import type { dummysType } from './CardList'

const CardFront = ({
  dummy,
  setFlip,
  setFlipCardId,
}: {
  dummy: dummysType
  setFlip: Dispatch<SetStateAction<boolean>>
  setFlipCardId: Dispatch<SetStateAction<number | null>>
}) => {
  const flipToggle = (id: number) => {
    setFlipCardId(id)
  }

  return (
    <div className=" h-[350px] w-auto rounded-xl bg-gray-200 p-3">
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center">
          <h1 className="flex-1 border-l-4 border-purple-700 pl-2 font-bold">
            {dummy?.name as string}
          </h1>
          <div className="flex gap-2">
            <button className="w-[70px] rounded-md bg-black p-1 text-white">github</button>
            <button className="w-[70px] rounded-md bg-purple-700 p-1 text-white">X</button>
          </div>
        </div>
        <div className="w-ful h-36 rounded-md bg-gray-400 text-center">image</div>

        <ul className="flex flex-col gap-1">
          <li className="border-l-2 border-purple-700 pl-2">所属：ハーバード大学</li>
          <li className="border-l-2 border-purple-700 pl-2">好きな技術：javascript</li>
          <li className="border-l-2 border-purple-700 pl-2">ポジション：フロントエンド</li>
        </ul>

        <div className="flex gap-2">
          <Link
            href="/projects_page"
            className="w-1/2 rounded-md bg-black p-1 text-center text-white"
          >
            Projects
          </Link>
          <button
            className="w-1/2 rounded-md bg-purple-700 p-1 text-white"
            onClick={() => flipToggle(dummy.id)}
          >
            Flip
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardFront
