'use client'
import useAuth from '@/hooks/useAuth'

const LogoutButton = () => {
  const { logOut } = useAuth()
  return (
    <button onClick={logOut} className=" rounded-md px-4 py-2 text-white hover:text-purple-300">
      ログアウト
    </button>
  )
}

export default LogoutButton
