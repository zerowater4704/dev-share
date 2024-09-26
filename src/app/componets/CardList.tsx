'use client'
import { useState } from 'react'
import CardBack from './CardBack'
import CardFront from './CardFront'
import Pagination from './Pagenation'
import usePageNation from './usePagenation'

const CardList = ({ usersData }: { usersData: UserAndProjectDataType[] }) => {
  const [flip, setFlip] = useState<boolean>(false)
  const [flipCardId, setFlipCardId] = useState<string | null>(null)
  const { currentArray, pageNumbers, pagenate, currentPage } = usePageNation(9, usersData)

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
    <div className="mb-16 mt-28 size-full">
      <ul className="mx-auto mt-10 grid w-11/12 grid-cols-2 gap-20 lg:grid-cols-3 ">
        {currentArray.map((user) => (
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
      <Pagination pageNumbers={pageNumbers} pagenate={pagenate} currentPage={currentPage} />
    </div>
  )
}

export default CardList
