'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import CommentModal from '../componets/CommentModal'

const Page = () => {
  const [projects, setProjects] = useState<any[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [currentProject, setCurrentProject] = useState<any | null>(null)
  const [comments, setComments] = useState<any[]>([])

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

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!currentProject) return
      try {
        const res = await fetch(`/api/comments?project=${currentProject._id}`)
        const data = await res.json()

        if (!res.ok) {
          console.error('Error fetching comments:', data.message)
        } else {
          console.log('Fetched comments:', data.comments)
          setComments(data.comments) // コメントをセット
        }
      } catch (error) {
        console.error('Error fetching comments:', error)
      }
    }

    fetchProjectData()
  }, [currentProject])

  const handleOpenModal = (project: any) => {
    setCurrentProject(project)
    setIsModalOpen(true)
  }

  // onClose は引数を取らない
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  // handleSubmitComment はコメントを受け取る
  const handleSubmitComment = async (comment: string) => {
    if (!currentProject) return

    try {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      const bodyData = {
        addedBy: userId, // ユーザーIDを正しく取得
        project: currentProject._id,
        comment: comment,
      }

      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          addedBy: userId, // ユーザーIDは実際の認証から取得する必要があります
          project: currentProject._id,
          comment: comment,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        console.error('Error submitting comment:', errorData)
        return
      }

      const responseData = await res.json()

      const updatedProjects = projects.map((project) =>
        project._id === currentProject._id
          ? { ...project, comments: [...project.comments, responseData.newComment] }
          : project,
      )

      setProjects(updatedProjects)
    } catch (error) {
      console.error('Error submitting comment:', error)
    }

    setIsModalOpen(false) // コメント送信後にモーダルを閉じる
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
            <div key={index} className="border rounded p-4 bg-white shadow">
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
                    <div className="flex justify-end">
                      <span className={`text-2xl text-gray-300`}>★</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      className="bg-gray-200 p-2 rounded"
                      onClick={() => handleOpenModal(project)} // Open modal on click
                    >
                      {project.comments.length > 0
                        ? `コメント: ${project.comments.length}`
                        : 'コメントなし'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <button className="bg-gray-200 px-4 py-2 rounded">Previous</button>
          <button className="bg-gray-200 px-4 py-2 rounded">Next</button>
        </div>
      </div>

      {currentProject && (
        <CommentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={handleSubmitComment}
          comments={currentProject.comments}
        />
      )}
    </>
  )
}

export default Page
