'use client'

import { useRouter } from 'next/navigation' // App Routerでのナビゲーション用

const useAuth = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const router = useRouter()

  const checkToken = async () => {
    const token = localStorage.getItem('token')

    if (!token) {
      // setIsLoading(false);
      return console.log('token is not found')
    }

    try {
      const res = await fetch(`${apiUrl}/api/verify-token`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        throw new Error('Token is invalid')
      }

      return console.log('success login')
      // setIsAuthenticated(true);
    } catch (error) {
      console.error('Authentication error:', error)
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
    } finally {
      router.push('/')
      // setIsLoading(false);
    }
  }
  // useEffect(() => {

  //   checkToken();
  // }, [router]);

  const logOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userName')
    router.push('/users_login')
  }

  return { checkToken, logOut }
}

export default useAuth
