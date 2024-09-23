"use client"; 

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const AddPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState<string[]>([]);
  const [duration, setDuration] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newProject = { title, language, duration, link };
    
    const existingProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    localStorage.setItem('projects', JSON.stringify([...existingProjects, newProject]));

    router.push('/'); // プロジェクト追加後、メインページにリダイレクト
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">プロジェクト追加</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mt-4">
          <label className="block mb-1">タイトル:</label>
          <input 
            type="text" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded w-full p-2" 
            placeholder="プロジェクトタイトル" 
          />
        </div>
        <div className="mt-4">
          <label className="block mb-1">開発言語:</label>
          <select 
            multiple 
            value={language} 
            onChange={(e) => setLanguage([...e.target.selectedOptions].map(option => option.value))}
            className="border rounded w-full p-2"
          >
            <option value="Java">Java</option>
            <option value="React">React</option>
            <option value="Next.js">Next.js</option>
          </select>
        </div>
        <div className="mt-4">
          <label className="block mb-1">開発期間:</label>
          <input 
            type="text" 
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border rounded w-full p-2" 
            placeholder="開発期間" 
          />
        </div>
        <div className="mt-4">
          <label className="block mb-1">アプリのリンク:</label>
          <input 
            type="text" 
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border rounded w-full p-2" 
            placeholder="https://your-app-link.com" 
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">追加</button>
      </form>
    </div>
  );
};

export default AddPage;
