'use client'
import { useState } from 'react'
import CardBack from './CardBack'
import CardFront from './CardFront'

const CardList = ({ usersData }: { usersData: UserType[] }) => {
  const [flip, setFlip] = useState<boolean>(false)
  const [flipCardId, setFlipCardId] = useState<string | null>(null)
  console.log(usersData)

  return (
    <ul className="mx-auto mt-10 grid w-11/12 grid-cols-3 gap-5">
      {usersData.map((user) => (
        <div key={user?._id} className="size-auto">
          {flipCardId === user?._id ? (
            <CardBack user={user} setFlip={setFlip} setFlipCardId={setFlipCardId} />
          ) : (
            <CardFront user={user} setFlip={setFlip} setFlipCardId={setFlipCardId} />
          )}
        </div>
      ))}
    </ul>
  )
}

export default CardList
