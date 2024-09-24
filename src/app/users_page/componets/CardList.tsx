'use client'
import { useState } from 'react'
import CardBack from './CardBack'
import CardFront from './CardFront'

export interface dummysType {
  id: number
  name: string
  languages: string
}

const dummys = [
  {
    id: 1,
    name: 'user1',
    languages: 'javascript',
  },
  {
    id: 2,
    name: 'user2',
    languages: 'java',
  },
  {
    id: 3,
    name: 'user3',
    languages: 'python',
  },
  {
    id: 4,
    name: 'user4',
    languages: 'typescript',
  },
  {
    id: 5,
    name: 'user5',
    languages: 'ruby',
  },
] as dummysType[]

const CardList = () => {
  const [flip, setFlip] = useState<boolean>(false)
  const [flipCardId, setFlipCardId] = useState<number | null>(null)

  return (
    <ul className="mx-auto mt-10 grid w-11/12 grid-cols-3 gap-5">
      {dummys.map((dummy, index) => (
        // eslint-disable-next-line react/jsx-key
        <div className="size-auto">
          {flipCardId === dummy.id ? (
            <CardBack key={index} dummy={dummy} setFlip={setFlip} setFlipCardId={setFlipCardId} />
          ) : (
            <CardFront key={index} dummy={dummy} setFlip={setFlip} setFlipCardId={setFlipCardId} />
          )}
        </div>
      ))}
    </ul>
  )
}

export default CardList
