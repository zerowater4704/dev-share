'use client'
import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'
import styles from './Card.module.css' // CSSモジュールをインポート

const CardFront = ({
  user,
  setFlipCardId,
}: {
  user: UserType // UserType が user オブジェクトの型であることを確認
  setFlipCardId: Dispatch<SetStateAction<string | null>>
}) => {
  return (
    <div className={`relative h-[350px] w-auto rounded-md bg-gray-200 p-3 ${styles.cardFront}`}>
      <div className="flex w-full flex-col gap-3">
        <div className="flex gap-4">
          {user.userImage ? (
            <img src={user.userImage} width="112" height="112" alt="User Image" />
          ) : (
            <div className="size-28 rounded-md bg-gray-400 text-center">image</div>
          )}
          <div className="flex h-auto flex-col justify-around gap-3">
            <h1 className="border-l-4 border-purple-700 pl-2 text-lg font-bold">
              {user?.userName}
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
          <li className="border-l-2 border-purple-700 pl-2">ポジション：{user.position}</li>
        </ul>

        <div className="absolute inset-x-0 bottom-3 mx-auto flex w-full gap-2 px-2">
          <Link
            href="/projects_page"
            className="w-1/2 rounded-md bg-black p-1 text-center text-white"
          >
            Projects
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardFront
