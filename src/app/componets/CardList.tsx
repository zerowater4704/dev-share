'use client'
import { useState } from 'react'
import usePageNation from '../../hooks/usePagenation'
import styles from './Card.module.css' // CSSモジュールをインポート
import CardBack from './CardBack'
import CardFront from './CardFront'
import Pagination from './Pagenation'

const CardList = ({ usersData }: { usersData: UserAndProjectDataType[] }) => {
  const [flipCardId, setFlipCardId] = useState<string | null>(null)
  const { currentArray, pageNumbers, pagenate, currentPage } = usePageNation(9, usersData)

  const handleFlip = (userId: string) => {
    if (flipCardId === userId) {
      setFlipCardId(null) // 元の状態に戻す
    } else {
      setFlipCardId(userId) // 現在のカードを反転
    }
  }

  return (
    <div className="mb-16 mt-28 size-full">
      <ul className="mx-auto mt-10 grid w-11/12 grid-cols-2 gap-10 lg:grid-cols-3">
        {currentArray.map((user) => (
          <div
            key={user?._id}
            className={`size-auto ${styles.card}`}
            onClick={() => handleFlip(user?._id)} // クリックでカード反転を処理
          >
            <div
              className={`${styles.cardInner} ${flipCardId === user?._id ? styles.flipped : ''}`}
            >
              <CardFront user={user} setFlipCardId={setFlipCardId} />
              <CardBack user={user} setFlipCardId={setFlipCardId} />
            </div>
          </div>
        ))}
      </ul>
      <Pagination pageNumbers={pageNumbers} pagenate={pagenate} currentPage={currentPage} />
    </div>
  )
}

export default CardList
