// import React from 'react'

// const ProjectList = () => {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {projects.map((project, index) => (
//             <div key={index} className="border rounded p-4 bg-white shadow">
//               <div className="flex justify-between items-start">
//                 {/* 左側の情報 */}
//                 <div>
//                   <div className="font-bold text-lg">{project.title}</div>
//                   <div className="mt-2">開発言語: {project.language.join(', ')}</div>
//                   <div className="mt-2">開発期間: {project.duration}</div>
//                   <div className="mt-2">
//                     アプリのリンク:{' '}
//                     <a href={project.link} target="_blank" rel="noopener noreferrer">
//                       {project.link}
//                     </a>
//                   </div>
//                 </div>

//                 <div className="text-right">
//                   <div className="mt-4">
//                     <div className="flex justify-end">
//                       <span className={`text-2xl text-gray-300`}>★</span>
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <button
//                       className="bg-gray-200 p-2 rounded"
//                       onClick={() => handleOpenModal(project)} // Open modal on click
//                     >
//                       {project.comments.length > 0
//                         ? `コメント: ${project.comments.length}`
//                         : 'コメントなし'}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//   )
// }

// export default ProjectList
