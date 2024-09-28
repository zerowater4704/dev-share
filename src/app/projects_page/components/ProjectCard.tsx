import React from 'react'

interface ProjectCardProps {
  project: any
  onOpenModal: (project: any) => void
  onOpenRatingModal: (project: any) => void
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenModal, onOpenRatingModal }) => {
  return (
    <div className="border rounded p-4 bg-white shadow">
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
              <button
                className="bg-gray-200 p-2 rounded"
                onClick={() => onOpenRatingModal(project)} // Open modal on click
              >
                <span className={`text-2xl text-gray-300`}>★</span>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <button
              className="bg-gray-200 p-2 rounded"
              onClick={() => onOpenModal(project)} // Open modal on click
            >
              {project.comments.length > 0
                ? `コメント: ${project.comments.length}`
                : 'コメントなし'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProjectCard
