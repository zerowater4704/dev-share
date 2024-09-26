import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'

const CardFront = ({
  user,
  setFlip,
  setFlipCardId,
}: {
  user: UserType
  setFlip: Dispatch<SetStateAction<boolean>>
  setFlipCardId: Dispatch<SetStateAction<string | null>>
}) => {
  const flipToggle = (id: string) => {
    setFlipCardId(id)
  }

  return (
    <div className=" relative h-[350px] w-auto rounded-xl bg-gray-200 p-3">
      <div className="flex w-full flex-col gap-3">
        <div className="flex items-center ">
          <h1 className="flex-1 border-l-4 border-purple-700 pl-2 font-bold">
            {user?.userName as string}
          </h1>
          <div className="flex gap-2">
            <Link href={`${user.githubAccount}`}>
              <button className="w-[70px] rounded-md bg-black p-1 text-white">github</button>
            </Link>
            <Link href={`${user?.xAccount}`}>
              <button className="w-[70px] rounded-md bg-purple-700 p-1 text-white">X</button>
            </Link>
          </div>
        </div>
        <div className="w-ful h-36 rounded-md bg-gray-400 text-center">image</div>

        <ul className="flex flex-col gap-1">
          <li className="border-l-2 border-purple-700 pl-2">{user?.school}</li>
          <li className="border-l-2 border-purple-700 pl-2">
            好きな技術：{user.languages.join(',')}
          </li>
          <li className="border-l-2 border-purple-700 pl-2">
            ポジション：{user.position.join(',')}
          </li>
        </ul>

        <div className="absolute inset-x-0 bottom-3 mx-auto flex w-full gap-2 px-2">
          <Link
            href="/projects_page"
            className="w-1/2 rounded-md bg-black p-1 text-center text-white"
          >
            Projects
          </Link>
          <button
            className="w-1/2 rounded-md bg-purple-700 p-1 text-white"
            onClick={() => flipToggle(user._id)}
          >
            Flip
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardFront
