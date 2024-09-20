'use client';

import { useState } from 'react';
import { useRouter } from '../../../node_modules/next/navigation';
import axios from 'axios';

interface FormData {
    email: string;
    name: string;
    address: string;
    skills: string;
    experience: string;
    education: string;
    portfolio: string;
    linkedin: string;
    github: string;
    projects: string;
}

export default function Profile() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    name:'',
    address:'',
    skills:'',
    experience: '',
    education: '',
    portfolio: '',
    linkedin: '',
    github: '',
    projects: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/profile', formData);

      if (response.status === 201) {
      
        router.push(`/resume?email=${formData.email}`);
      } else {
        alert('Profile update failed: ' + response.data.message);
      }
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      if (axios.isAxiosError(error) && error.response) {
        alert('Error: ' + error.response.data.message);
      } else {
        alert('An error occurred while submitting the form.');
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Profile Page</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
      <input 
          type="text" 
          name="name" 
          placeholder="name" 
          value={formData.name} 
          onChange={handleChange} 
          className="border p-2 w-full rounded"
        />
        <input 
          type="text" 
          name="address" 
          placeholder="address" 
          value={formData.address} 
          onChange={handleChange} 
          className="border p-2 w-full rounded"
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          className="border p-2 w-full rounded"
        />
        <input 
          type="text" 
          name="skills" 
          placeholder="skills" 
          value={formData.skills} 
          onChange={handleChange} 
          className="border p-2 w-full rounded"
        />
        <input 
          type="text" 
          name="experience" 
          placeholder="Experience" 
          value={formData.experience} 
          onChange={handleChange} 
          className="border p-2 w-full rounded"
        />
        <input 
          type="text" 
          name="education" 
          placeholder="Education" 
          value={formData.education} 
          onChange={handleChange} 
          className="border p-2 w-full rounded"
        />
        <input 
          type="text" 
          name="portfolio" 
          placeholder="Portfolio" 
          value={formData.portfolio} 
          onChange={handleChange} 
          className="border p-2 w-full rounded"
        />
        <input 
          type="text" 
          name="linkedin" 
          placeholder="LinkedIn" 
          value={formData.linkedin} 
          onChange={handleChange} 
          className="border p-2 w-full rounded"
        />
        <input 
          type="text" 
          name="github" 
          placeholder="GitHub" 
          value={formData.github} 
          onChange={handleChange} 
          className="border p-2 w-full rounded"
        />
        <input 
          type="text" 
          name="projects" 
          placeholder="Projects" 
          value={formData.projects} 
          onChange={handleChange} 
          className="border p-2 w-full rounded"
        />
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
        >
          Generate CV
        </button>
      </form>
    </div>
  );
}
