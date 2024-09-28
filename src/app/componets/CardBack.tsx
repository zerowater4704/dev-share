import useRating from '@/hooks/useRating'
import Link from 'next/link'
import type { Dispatch, SetStateAction } from 'react'

const CardBack = ({
  user,
  setFlip,
  setFlipCardId,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: UserAndProjectDataType
  setFlip: Dispatch<SetStateAction<boolean>>
  setFlipCardId: Dispatch<SetStateAction<string | null>>
}) => {
  const { calcAverage, renderStars } = useRating()
  const flipToggle = () => {
    setFlipCardId(null)
  }

  console.log(user.projects)

  return (
    <div className="relative h-[350px] w-full rounded-md bg-gray-200 p-3">
      <div className="flex w-full flex-col gap-3">
        <h1 className="rounded-md bg-purple-700 py-1 text-center font-bold text-white">Projects</h1>
        {user.projects.length > 0 ? (
          <ul className="mx-1 flex flex-col gap-5">
            {user.projects.map((project: ProjectType) => (
              <li key={project._id} className=" flex flex-col justify-between">
                <div className="flex justify-between">
                  <span className="flex-1 items-center border-l-4 border-purple-700 pl-2 font-bold">
                    {project.title}
                  </span>
                  <div className="flex gap-1">
                    <Link href="https://meet.google.com/landing" target="_blank">
                      <button className="w-16 rounded-full bg-black p-1 text-sm text-white">
                        GitHub
                      </button>
                    </Link>
                    <Link href={project.link} target="_blank">
                      <button className="w-16 rounded-full bg-purple-700 p-1 text-sm text-white">
                        App
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="pl-3 text-sm">
                  {/* {renderStars()}
                  {calcAverage(project.rating)} */}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-24 w-full text-center">データがありません💦</div>
        )}

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
