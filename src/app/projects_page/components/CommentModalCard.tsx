import React, { useEffect, useState } from 'react'

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updatedProject: (updatedProject: any) => void
}

const CommentModalCard: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  projectId,
  updatedProject,
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const [comment, setComment] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId || !isOpen) return
      try {
        const res = await fetch(`${apiUrl}/api/comments?project=${projectId}`)
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
  }, [apiUrl, isOpen, projectId])

  const handleSubmitComment = async (comment: string) => {
    if (!comment) return

    try {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('userId')

      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          addedBy: userId, // ユーザーIDは実際の認証から取得する必要があります
          project: projectId,
          comment,
        }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        console.error('Error submitting comment:', errorData)
        return
      }

      const responseData = await res.json()

      updatedProject(responseData.newComment)
      setComment('')
    } catch (error) {
      console.error('Error submitting comment:', error)
    }

    onClose()
  }

  if (!isOpen) return null

  return (
    // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 rounded bg-white p-4">
        <h2 className="mb-4 text-xl font-bold">コメントを追加</h2>

        <div className="mb-4">
          <h3 className="font-semibold">既存のコメント</h3>
          <ul className="max-h-40 overflow-y-auto border p-2">
            {comments && comments.length > 0 ? (
              comments.map((commentObj, index) => {
                // コメントオブジェクトをデバッグ出力
                console.log(commentObj)

                return (
                  <li key={index} className="border-b p-2">
                    <strong>{commentObj.addedBy ? commentObj.addedBy.userName : '作成者'}:</strong>{' '}
                    {commentObj.comment}
                  </li>
                )
              })
            ) : (
              <p>コメントがありません</p>
            )}
          </ul>
        </div>

        <textarea
          className="mb-4 w-full border p-2"
          rows={4}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="mr-2 rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => handleSubmitComment(comment)}
          >
            追加
          </button>
          <button className="rounded bg-gray-300 px-4 py-2" onClick={onClose}>
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentModalCard
