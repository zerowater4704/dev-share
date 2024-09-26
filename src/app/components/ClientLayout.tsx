// src/app/components/ClientLayout.tsx (クライアントコンポーネント)
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // const isAuthenticated = false // 認証状態の確認ロジック
    //  if (!isAuthenticated) {
    router.push('/users_login') // 認証されていない場合はログインページにリダイレクト
    //}
  }, [router])

  return <>{children}</>
}
