/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import DeleteButton from './DeleteButton'

interface ProjectCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any
  onOpenModal: (project: any) => void
  onOpenRatingModal: (project: any) => void
  onDelete: (id: string) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenModal,
  onOpenRatingModal,
  onDelete,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [averageRating, setAverageRating] = useState<number | null>(null)
  const [userRating, setUserRating] = useState<number | null>(null)
  const [isRatingFetched, setIsRatingFetched] = useState(false)

  useEffect(() => {
    const fetchRating = async () => {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')
      if (!token || !userId) {
        console.error('トークンが見つかりません')
        return
      }

      try {
        const res = await fetch(`${apiUrl}/api/rating?project=${project._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await res.json()

        if (!res.ok) {
          console.error('Error fetching rating:', data.message)
          return
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const projectData = data.projects.find((proj: any) => proj._id === project._id)
        console.log('ProjectCard API response:', projectData)

        if (projectData) {
          setAverageRating(parseFloat(projectData.averageRating || '0'))

          // 各プロジェクトの評価を確認し、ユーザーの評価があるか確認
          const userRatingData = Array.isArray(projectData.ratings)
            ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
              projectData.ratings.find((rating: any) => rating.addedBy === userId)
            : null
          setUserRating(userRatingData ? userRatingData.rating : null)
        }

        setIsRatingFetched(true)
      } catch (error) {
        console.error('Error fetching rating:', error)
      }
    }
    fetchRating()
  }, [apiUrl, project._id])

  return (
    <div className="rounded border bg-white p-4 shadow">
      <div className="flex items-start justify-between">
        {/* 左側の情報 */}
        <div>
          <div className="text-lg font-bold">{project.title}</div>
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
            <div className="flex items-end justify-end">
              <span
                className={`text-2xl ${userRating !== null ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={
                  userRating !== null || !isRatingFetched
                    ? undefined
                    : () => onOpenRatingModal(project) // ユーザーが評価していない場合のみクリック可能
                }
                style={{
                  cursor: userRating !== null || !isRatingFetched ? 'not-allowed' : 'pointer',
                }}
              >
                ★
              </span>
              <span
                className={`text-md ${averageRating !== null ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                {averageRating !== null ? averageRating.toFixed(1) : '0.00'}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <button
              className="rounded bg-gray-200 p-2"
              onClick={() => onOpenModal(project)} // Open modal on click
            >
              {project.comments.length > 0
                ? `コメント: ${project.comments.length}`
                : 'コメントなし'}
            </button>
          </div>
          <DeleteButton projectId={project._id} onDelete={onDelete} />
        </div>
      </div>
    </div>
  )
}
export default ProjectCard
