'use client'
import { useEffect, useState } from 'react'
import CommentModalCard from '../projects_page/components/CommentModalCard' // CommentModalCardをインポート
import ProjectCard from '../projects_page/components/ProjectCard' // ProjectCardコンポーネントをインポート

type Project = {
  _id: string
  title: string
  projectImage: string
  duration: string
  link: string
  language: string[]
  rating: number
  comments: Comment[]
  addedBy: {
    userName: string
  }
}

type Comment = {
  _id: string
  content: string
  addedBy: {
    userName: string
  }
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // JWTトークンをヘッダーに追加
        },
      })

      if (!response.ok) {
        throw new Error('プロジェクトを取得できませんでした')
      }

      const data = await response.json()
      setProjects(data.projects)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleOpenModal = (projectId: string) => {
    setSelectedProjectId(projectId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProjectId(null)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onOpenModal={() => handleOpenModal(project._id)} // モーダルを開く処理
              onOpenRatingModal={(project) => {
                // 評価モーダルを開く処理をここに実装
                console.log('Open rating modal for', project)
              }}
            />
          ))}
        </div>
      )}

      <CommentModalCard
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projectId={selectedProjectId!} // 必ずプロジェクトIDがあることを前提
        updatedProject={(updatedComment) => {
          // コメントが追加された後の処理を実装
          console.log('Updated project with new comment:', updatedComment)
        }}
      />
    </div>
  )
}

export default ProjectsPage
