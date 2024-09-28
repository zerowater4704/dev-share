import React from 'react'

interface DeleteButtonProps {
  projectId: string
  onDelete: (id: string) => void
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ projectId, onDelete }) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const handleDelete = async () => {
    if (window.confirm('本当に削除しますか？')) {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch(`${apiUrl}/api/project?id=${projectId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        if (!res.ok) {
          const data = await res.json()
          console.error('削除に失敗しました。', data.message)
          alert('削除に失敗しました。')
          return
        }

        onDelete(projectId)
      } catch (error) {
        console.error('削除エラー', error)
        alert('削除エラーが発生しました。')
      }
    }
  }

  return (
    <button onClick={handleDelete} className="mt-2 rounded bg-red-500 p-2 text-white">
      削除
    </button>
  )
}

export default DeleteButton
