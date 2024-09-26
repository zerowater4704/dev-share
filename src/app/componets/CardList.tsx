'use client'
import { useState } from 'react'
import CardBack from './CardBack'
import CardFront from './CardFront'

const CardList = ({ usersData }: { usersData: UserType[] }) => {
  const [flip, setFlip] = useState<boolean>(false)
  const [flipCardId, setFlipCardId] = useState<string | null>(null)
  console.log(usersData)

  // usersData が配列であるかどうかを確認
  if (!Array.isArray(usersData)) {
    return <div>No user data available.</div>
  }

  const handleFlip = (userId: string) => {
    if (flipCardId === userId) {
      setFlip(false)
      setFlipCardId(null) // 元の状態に戻す
    } else {
      setFlip(true)
      setFlipCardId(userId) // 現在のカードを反転
    }
  }

  return (
    <ul className="mx-auto mt-10 grid w-11/12 grid-cols-3 gap-5">
      {usersData.map((user) => (
        <div
          key={user?._id}
          className="size-auto"
          onClick={() => handleFlip(user?._id)} // クリックでカード反転を処理
        >
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
