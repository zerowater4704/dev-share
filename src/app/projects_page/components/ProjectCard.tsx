import React, { useEffect, useState } from 'react'

interface ProjectCardProps {
  project: any
  onOpenModal: (project: any) => void
  onOpenRatingModal: (project: any) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal, onOpenRatingModal }) => {
  const [averageRating, setAverageRating] = useState<number | null>(null)

  useEffect(() => {
    const fetchRating = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('トークンが見つかりません')
        return
      }

      try {
        const res = await fetch(`/api/rating?project=${project._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        console.log('Response status:', res.status)

        const data = await res.json()
        if (!res.ok) {
          console.error('Error fetching rating:', data.message)
          return
        }

        const ratings = data?.ratings || []
        console.log('Fetched ratings:', ratings)

        if (ratings.length > 0) {
          const totalRating = ratings.reduce(
            (acc: number, rating: { rating: number }) => acc + rating.rating,
            0,
          )
          const avg = totalRating / ratings.length
          setAverageRating(avg)
        } else {
          setAverageRating(0)
        }
      } catch (error) {
        console.error('Error fetching rating:', error)
      }
    }
    fetchRating()
  }, [project._id])

  return (
    <div className="border rounded p-4 bg-white shadow">
      <div className="flex justify-between items-start">
        {/* 左側の情報 */}
        <div>
          <div className="font-bold text-lg">{project.title}</div>
          <div className="mt-2">開発言語: {project.language.join(', ')}</div>
          <div className="mt-2">開発期間: {project.duration}</div>
          <div className="mt-2">
            アプリのリンク:{' '}
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              {project.link}
            </a>
          </div>
        </div>

        <div className="text-right">
          <div className="mt-4">
            <div className="flex justify-end items-center">
              <span
                className={`text-2xl mr-4 ${averageRating ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                {averageRating ? averageRating.toFixed(2) : '0'}
              </span>
              <button
                className=" p-2 rounded"
                onClick={() => onOpenRatingModal(project)} // Open modal on click
              >
                <span className={`text-2xl text-gray-300`}>★</span>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <button
              className="bg-gray-200 p-2 rounded"
              onClick={() => onOpenModal(project)} // Open modal on click
            >
              {project.comments.length > 0
                ? `コメント: ${project.comments.length}`
                : 'コメントなし'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProjectCard
