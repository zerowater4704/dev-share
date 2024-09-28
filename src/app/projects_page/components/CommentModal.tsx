import React, { useState } from 'react'

interface CommentModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (comment: string) => Promise<void>
  comments: Array<{ comment: string; addedBy?: { userName: string } }> | undefined
}

const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, onSubmit, comments }) => {
  const [comment, setComment] = useState('')

  const handelSubmit = async () => {
    await onSubmit(comment)
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
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={handelSubmit}>
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

export default CommentModal
