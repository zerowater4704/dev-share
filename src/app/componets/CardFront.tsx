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
    <div className=" relative h-[350px] w-auto rounded-md bg-gray-200 p-3">
      <div className="flex w-full flex-col gap-3">
        <div className="flex gap-4">
          <div className="size-28 rounded-md bg-gray-400 text-center">image</div>
          <div className="flex h-auto flex-col justify-around gap-3">
            <h1 className=" border-l-4 border-purple-700 pl-2 text-lg font-bold ">
              {user?.userName as string}
            </h1>
            <div className="flex gap-2">
              <Link href={`${user.githubAccount}`}>
                <button className="ml-auto w-[70px] rounded-md bg-black p-1 text-white">
                  github
                </button>
              </Link>
              <Link href={`${user?.xAccount}`}>
                <button className="w-[70px] rounded-md bg-purple-700 p-1 text-white">X</button>
              </Link>
            </div>
          </div>
        </div>

        <ul className="mt-5 flex flex-col gap-2">
          <li className="border-l-2 border-purple-700 pl-2">出身：{user?.school}</li>
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
