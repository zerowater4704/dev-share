import React, { useEffect, useState } from 'react'

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  projectId: string
  updatedProject: (updatedProject: any) => void
}

const CommentModalCard: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  projectId,
  updatedProject,
}) => {
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState<any[]>([])

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!projectId || !isOpen) return
      try {
        const res = await fetch(`/api/comments?project=${projectId}`)
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
  }, [isOpen, projectId])

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
          comment: comment,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-1/3">
        <h2 className="text-xl font-bold mb-4">コメントを追加</h2>

        <div className="mb-4">
          <h3 className="font-semibold">既存のコメント</h3>
          <ul className="border p-2 max-h-40 overflow-y-auto">
            {comments && comments.length > 0 ? (
              comments.map((commentObj, index) => {
                // コメントオブジェクトをデバッグ出力
                console.log(commentObj)

                return (
                  <li key={index} className="p-2 border-b">
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
          className="border w-full p-2 mb-4"
          rows={4}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={() => handleSubmitComment(comment)}
          >
            追加
          </button>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentModalCard
