import React from 'react'

interface ProjectCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  project: any
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="rounded border bg-white p-4 shadow">
      <div className="text-lg font-bold">{project.title}</div>
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
