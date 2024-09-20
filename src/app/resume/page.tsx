"use client"; // Ensure this is client-side only

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

interface UserData {
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

// Fallback component for Suspense
const Loading = () => <p>Loading...</p>;

export default function Resume() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/generatecv`, {
          params: { email }
        });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (email) {
      fetchData();
    }
  }, [email]);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4 w-[40%] p-2 border rounded border-black shadow-sm">
      <h1 className='text-center text-3xl font-bold'>Resume</h1>
      <div className='flex border border-black border-b-2 h-16'>
        <div className='border-r-2 w-24 h-full p-2'>Name: </div><div className='w-full p-2 '>{userData.name}</div>
      </div>
      <div className='flex border border-black border-b-2 h-16'>
        <div className='border-r-2 w-24 h-full p-2'>Email: </div><div className='w-full p-2 '>{userData.email}</div>
      </div>
      <div className='flex border border-black border-b-2 h-16'>
        <div className='border-r-2 w-24 h-full p-2'>Address: </div><div className='w-full p-2 '>{userData.address}</div>
      </div>
      <div className='flex border border-black border-b-2 h-16'>
        <div className='border-r-2 w-24 h-full p-2'>Skills: </div><div className='w-full p-2 '>{userData.skills}</div>
      </div>
      <div className='flex border border-black border-b-2 h-16'>
        <div className='border-r-2 w-24 h-full p-2'>Experience: </div><div className='w-full p-2 '>{userData.experience}</div>
      </div>
      <div className='flex border border-black border-b-2 h-16'>
        <div className='border-r-2 w-24 h-full p-2'>Education: </div><div className='w-full p-2 '>{userData.education}</div>
      </div>
      <div className='flex border border-black border-b-2 h-16'>
        <div className='border-r-2 w-24 h-full p-2'>Portfolio: </div><div className='w-full p-2 '>{userData.portfolio}</div>
      </div>
      <div className='flex border border-black border-b-2 h-16'>
        <div className='border-r-2 w-24 h-full p-2'>LinkedIn: </div><div className='w-full p-2 '>{userData.linkedin}</div>
      </div>
      <div className='flex border border-black border-b-2 h-16'>
        <div className='border-r-2 w-24 h-full p-2'>GitHub: </div><div className='w-full p-2 '>{userData.github}</div>
      </div>
      <div className='flex border border-black border-b-2 h-16'>
        <div className='border-r-2 w-24 h-full p-2'>Projects: </div><div className='w-full p-2 '>{userData.projects}</div>
      </div>
    </div>
  );
}

// Wrap the Resume component in a Suspense boundary to handle client-side data fetching
export function SuspenseWrapper() {
  return (
    <Suspense fallback={<Loading />}>
      <Resume />
    </Suspense>
  );
}
