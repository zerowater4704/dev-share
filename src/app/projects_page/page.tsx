'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import CommentModalCard from './components/CommentModalCard'
import ProjectCard from './components/ProjectCard'
import RatingModalCardProps from './components/RatingModalCard'

const Page = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isRatingModalOpen, setIsRatingModalOpen] = useState<boolean>(false)
  const [currentProject, setCurrentProject] = useState<any | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setErrorMessage('ログインしてください')
        return
      }

      try {
        const res = await fetch('/api/project', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log('Response status:', res.status)

        if (!res.ok) {
          const errorData = await res.json()
          console.error('Error data:', errorData)
          setErrorMessage(errorData.error)
          return
        }

        const data = await res.json()
        setProjects(data.projects)
      } catch (error) {
        console.error(error)
        setErrorMessage('エラーが発生しました')
      }
    }

    fetchProjects()
  }, [])

  const handleOpenModal = (project: any) => {
    setCurrentProject(project)
    setIsModalOpen(true)
  }

  const handleOpenRatingModal = (project: any) => {
    setCurrentProject(project)
    setIsRatingModalOpen(true)
  }

  // onClose は引数を取らない
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleCloseRatingModal = () => {
    setIsRatingModalOpen(false)
  }

  // handleSubmitComment はコメントを受け取る
  // const handleSubmitComment = async (comment: string) => {
  //   if (!currentProject) return

  //   try {
  //     const token = localStorage.getItem('token')
  //     const userId = localStorage.getItem('userId')

  //     const res = await fetch('/api/comments', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         addedBy: userId, // ユーザーIDは実際の認証から取得する必要があります
  //         project: currentProject._id,
  //         comment: comment,
  //       }),
  //     })

  //     if (!res.ok) {
  //       const errorData = await res.json()
  //       console.error('Error submitting comment:', errorData)
  //       return
  //     }

  //     const responseData = await res.json()

  //     const updatedProjects = projects.map((project) =>
  //       project._id === currentProject._id
  //         ? { ...project, comments: [...project.comments, responseData.newComment] }
  //         : project,
  //     )

  //     setProjects(updatedProjects)
  //   } catch (error) {
  //     console.error('Error submitting comment:', error)
  //   }

  //   setIsModalOpen(false) // コメント送信後にモーダルを閉じる
  // }

  const updateProjects = (newProject: any) => {
    const updatedProjects = projects.map((project) =>
      project._id === newProject._id ? newProject : project,
    )

    setProjects(updatedProjects)
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">プロジェクト管理</h1>
          <Link href="/add_page">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">追加</button>
          </Link>
        </div>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              onOpenModal={handleOpenModal}
              onOpenRatingModal={handleOpenRatingModal}
            />
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button className="bg-gray-200 px-4 py-2 rounded">Previous</button>
          <button className="bg-gray-200 px-4 py-2 rounded">Next</button>
        </div>
      </div>

      {currentProject && (
        <>
          <CommentModalCard
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            projectId={currentProject._id}
            updatedProject={updateProjects}
          />
          <RatingModalCardProps
            isOpen={isRatingModalOpen}
            onClose={handleCloseRatingModal}
            projectId={currentProject._id}
          />
        </>
      )}
    </>
  )
}

export default Page
