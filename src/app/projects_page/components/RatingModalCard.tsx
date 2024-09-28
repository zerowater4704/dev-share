import React, { useEffect, useState } from 'react'

interface RatingModalCardProps {
  isOpen: boolean
  onClose: () => void
  // onSubmit: (rating: number) => Promise<void>
  projectId: string
}

const RatingModalCardProps: React.FC<RatingModalCardProps> = ({ isOpen, onClose, projectId }) => {
  const [rating, setRating] = useState<number>(0)
  const [currentRating, setCurrentRating] = useState<number | null>(null)

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId || !isOpen) return
      try {
        const res = await fetch(`/api/rating?project=${projectId}`)
        const data = await res.json()

        if (!res.ok) {
          console.error('Error fetching rating:', data.message)
        } else {
          console.log('Fetched rating:', data.rating)
          setCurrentRating(data.rating) // コメントをセット
        }
      } catch (error) {
        console.error('Error fetching rating:', error)
      }
    }

    fetchProjectData()
  }, [isOpen, projectId])

  const handleSubmitRating = async () => {
    if (!projectId) return

    try {
      const token = localStorage.getItem('token')

      const res = await fetch(`/api/rating?project=${projectId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        console.error('Error data:', errorData)
        return
      }

      const responseData = await res.json()

      setCurrentRating(responseData.newRating)
    } catch (error) {
      console.error('Error submitting rating:', error)
    }
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center h-screen w-screen">
      <div className="bg-white p-4 rounded w-1/3">
        <div className="mb-4 flex justify-center">
          <h3 className="font-semibold">現在の評価: {currentRating ?? '未評価'}</h3>
        </div>

        <div className="mb-4 flex justify-center py-2">
          <div className="rating rating-lg">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                name="rating-8"
                className="mask mask-star-2 bg-orange-400 text-6xl"
                onClick={() => setRating(star)}
                checked={star === rating} // 選択された星をチェックする
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <button className="bg-gray-300 px-4 py-2 rounded mr-2" onClick={onClose}>
            キャンセル
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmitRating}>
            送信
          </button>
        </div>
      </div>
    </div>
  )
}

export default RatingModalCardProps
