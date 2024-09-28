import React from 'react'

interface ProjectCardProps {
  project: any
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="border rounded p-4 bg-white shadow">
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
  )
}

export default ProjectCard
