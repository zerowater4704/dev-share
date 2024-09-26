// src/app/components/ClientLayout.tsx (クライアントコンポーネント)
'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from './Header'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // 認証されていない場合はログインページにリダイレクトするロジック
    const isAuthenticated = false // 認証状態の確認ロジック (一時的な値)
    if (!isAuthenticated) {
      router.push('/users_login')
    }
  }, [router])

  // `/users_login` または `/users_register` ページではヘッダーを非表示にするロジック
  const shouldShowHeader = pathname !== '/users_login' && pathname !== '/users_register'

  return (
    <>
      {shouldShowHeader && <Header />}
      {children}
    </>
  )
}
