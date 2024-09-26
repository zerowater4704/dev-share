import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'

const CardBack = ({
  user,
  setFlip,
  setFlipCardId,
}: {
  user: UserType
  setFlip: Dispatch<SetStateAction<boolean>>
  setFlipCardId: Dispatch<SetStateAction<string | null>>
}) => {
  const flipToggle = () => {
    setFlipCardId(null)
  }

  return (
    <div className="relative h-[350px] w-full rounded-xl bg-gray-200 p-3">
      <div className="flex w-full flex-col gap-3">
        <h1 className="rounded-md bg-purple-700 py-1 text-center font-bold text-white">Projects</h1>
        <ul className="mx-1 flex flex-col gap-5">
          <li className=" flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="flex-1 items-center border-l-4 border-purple-700 pl-2 font-bold">
                Todoアプリ
              </span>
              <div className="flex gap-1">
                <Link href="/">
                  <button className="w-16 rounded-full bg-black p-1 text-sm text-white">
                    GitHub
                  </button>
                </Link>
                <Link href="/">
                  <button className="w-16 rounded-full bg-purple-700 p-1 text-sm text-white">
                    App
                  </button>
                </Link>
              </div>
            </div>
            <div className="pl-3 text-sm">⭐️⭐️⭐️⭐️⭐️4.3</div>
          </li>

          <li className=" flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="flex-1 items-center border-l-4 border-purple-700 pl-2 font-bold">
                Todoアプリ
              </span>
              <div className="flex gap-1">
                <Link href="/">
                  <button className="w-16 rounded-full bg-black p-1 text-sm text-white">
                    GitHub
                  </button>
                </Link>
                <Link href="/">
                  <button className="w-16 rounded-full bg-purple-700 p-1 text-sm text-white">
                    App
                  </button>
                </Link>
              </div>
            </div>
            <div className="pl-3 text-sm">⭐️⭐️⭐️⭐️⭐️5</div>
          </li>

          <li className=" flex flex-col justify-between">
            <div className="flex justify-between">
              <span className="flex-1 items-center border-l-4 border-purple-700 pl-2 font-bold">
                Todoアプリ
              </span>
              <div className="flex gap-1">
                <Link href="/">
                  <button className="w-16 rounded-full bg-black p-1 text-sm text-white">
                    GitHub
                  </button>
                </Link>
                <Link href="/">
                  <button className="w-16 rounded-full bg-purple-700 p-1 text-sm text-white">
                    App
                  </button>
                </Link>
              </div>
            </div>
            <div className="pl-3 text-sm">⭐️⭐️⭐️⭐️⭐️3.5</div>
          </li>
        </ul>

        <button
          className="absolute bottom-3 right-2 w-1/2 rounded-md bg-purple-700 p-1 text-white"
          onClick={() => flipToggle()}
        >
          Flip
        </button>
      </div>
    </div>
  )
}

export default CardBack
