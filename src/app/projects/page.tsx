'use client'
import { useEffect, useState } from 'react'
import CommentModalCard from '../projects_page/components/CommentModalCard' // CommentModalCardをインポート
import ProjectCard from '../projects_page/components/ProjectCard' // ProjectCardコンポーネントをインポート
import RatingModalCard from '../projects_page/components/RatingModalCard' // RatingModalCardをインポート

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
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false) // Rating Modalのstate
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('') // 検索用のステート
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]) // フィルタリングされたプロジェクト

  useEffect(() => {
    const fetchProjects = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL

      try {
        const response = await fetch(`${apiUrl}/api/projects`, {
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
        setFilteredProjects(data.projects) // 初期状態でフィルタリングされたプロジェクトを設定
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // searchTermの変更に基づいて自動的に検索結果をフィルタリング
  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase() // 小文字に変換して比較
    const filtered = projects.filter(
      (project) =>
        project.title.toLowerCase().includes(lowerCaseSearchTerm) || // タイトルに含まれる場合
        project.language.some((lang) => lang.toLowerCase().includes(lowerCaseSearchTerm)), // 言語に含まれる場合
    )
    setFilteredProjects(filtered)
  }, [searchTerm, projects])

  const handleOpenModal = (projectId: string) => {
    setSelectedProjectId(projectId)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProjectId(null)
  }

  const handleOpenRatingModal = (projectId: string) => {
    setSelectedProjectId(projectId)
    setIsRatingModalOpen(true)
  }

  const handleCloseRatingModal = () => {
    setIsRatingModalOpen(false)
    setSelectedProjectId(null)
  }

  const handleDeleteProject = async (projectId: string) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL

    try {
      const response = await fetch(`${apiUrl}/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // JWTトークンをヘッダーに追加
        },
      })

      if (!response.ok) {
        throw new Error('プロジェクトを削除できませんでした')
      }

      // プロジェクト一覧から削除
      setProjects((prevProjects) => prevProjects.filter((project) => project._id !== projectId))
      setFilteredProjects((prevProjects) =>
        prevProjects.filter((project) => project._id !== projectId),
      )
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">All Projects</h1>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="検索したいキーワード"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2 grow rounded-md border border-gray-300 p-2"
        />
      </div>

      {filteredProjects.length === 0 ? (
        <p>プロジェクトが見つかりませんでした</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onOpenModal={() => handleOpenModal(project._id)} // コメントモーダルを開く処理
              onOpenRatingModal={() => handleOpenRatingModal(project._id)} // 評価モーダルを開く処理
              onDelete={() => handleDeleteProject(project._id)} // プロジェクトを削除する処理
            />
          ))}
        </div>
      )}

      <CommentModalCard
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        projectId={selectedProjectId!} // 必ずプロジェクトIDがあることを前提
        updatedProject={(updatedComment) => {
          // コメントが追加された後の処理
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project._id === updatedComment.projectId
                ? { ...project, comments: [...project.comments, updatedComment] }
                : project,
            ),
          )
        }}
      />

      <RatingModalCard
        isOpen={isRatingModalOpen}
        onClose={handleCloseRatingModal}
        projectId={selectedProjectId!} // 評価対象のプロジェクトID
        updateProject={(updatedRating) => {
          // 評価が更新された後の処理
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project._id === updatedRating.projectId
                ? { ...project, rating: updatedRating.newRating }
                : project,
            ),
          )
        }}
      />
    </div>
  )
}

export default ProjectsPage
