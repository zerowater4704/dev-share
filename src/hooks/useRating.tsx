'use client'
import { useState } from 'react'

const useRating = () => {
  const [averageNum, setAverageNum] = useState<number>(0)

  const calcAverage = (rating: RatingType[]) => {
    const ratingNumerArraty = rating.map((rate) => {
      return rate.rating
    })

    const totalRate = ratingNumerArraty.reduce((a, b) => {
      return a + b
    }, 0)

    const average = totalRate / ratingNumerArraty.length

    setAverageNum(parseFloat(average.toFixed(2)))
    return parseFloat(average.toFixed(2))
  }

  const renderStars = () => {
    const fullStars = Math.floor(averageNum) // 塗りつぶしの星の数
    const halfStar = averageNum % 1 >= 0.5 // 半分の星が必要かどうか
    const emptyStars = Math.max(0, 5 - fullStars - (halfStar ? 1 : 0)) // 空の星（負数にならないようにする）

    return (
      <div className="rating">
        {[...Array(fullStars)].map((_, index) => (
          <input key={index} type="radio" className="mask mask-star-2 bg-yellow-400" readOnly />
        ))}
        {halfStar && (
          <input type="radio" className="mask mask-star-2 bg-yellow-400 opacity-50" readOnly />
        )}
        {[...Array(emptyStars)].map((_, index) => (
          <input key={index} type="radio" className="mask mask-star-2" readOnly />
        ))}
      </div>
    )
  }

  return { calcAverage, renderStars }
}

export default useRating
