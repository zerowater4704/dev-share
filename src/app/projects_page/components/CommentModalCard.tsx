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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">コメント</h2>
        {/* 既存のコメントリスト表示 */}
        <div className="mb-6">
          <ul className="border border-gray-300 rounded-md max-h-40 overflow-y-auto bg-gray-50">
            {comments && comments.length > 0 ? (
              comments.map((commentObj, index) => (
                <li key={index} className="p-3 border-b border-gray-200 last:border-none">
                  {/* 上部: ユーザー名といいねボタン */}
                  <div className="flex justify-between items-center mb-2">
                    <strong className="text-sm text-purple-600">
                      {commentObj.addedBy ? commentObj.addedBy.userName : '作成者'}
                    </strong>
                    <button className="text-gray-500 hover:text-red-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* 下部: コメントと削除ボタン */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">{commentObj.comment}</span>
                    <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-2 py-1 rounded-md">
                      削除
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">コメントがありません</p>
            )}
          </ul>
        </div>

        {/* 新規コメント入力エリア */}
        <h2 className="text-xl font-bold mb-4">コメントを追加</h2>

        <textarea
          className="border w-full p-2 mb-4 rounded-md"
          rows={2}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* 送信＆キャンセルボタン */}
        <div className="flex justify-end">
          <button
            className=" text-white px-4 py-2 rounded mr-2 bg-purple-500 hover:bg-purple-600"
            onClick={() => handleSubmitComment(comment)}
          >
            追加
          </button>
          <button className="bg-gray-300 hover:bg-gray-200 px-4 py-2 rounded" onClick={onClose}>
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}

export default CommentModalCard
