'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const Page = () => {
  const [projects, setProjects] = useState<any[]>([])

  useEffect(() => {
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]')
    setProjects(existingProjects)
  }, [])

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex justify-between mb-4">
          <h1 className="text-xl font-bold">プロジェクト管理</h1>
          <Link href="/add_page">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">追加</button>
          </Link>
        </div>
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
                    <div className="border p-2 rounded">コメントなし</div>
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
    </>
  )
}

export default Page
