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

const Resume = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  useEffect(() => {
    const fetchData = async () => {
      if (email) {
        try {
          const response = await axios.get(`/api/generatecv`, {
            params: { email }
          });
          setUserData(response.data.user);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [email]);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4 w-[40%] p-2 border rounded border-black shadow-sm">
      <h1 className='text-center text-3xl font-bold'>Resume</h1>
      {/* Resume details */}
      <div className='flex border border-black border-b-2 h-16'>
        <div className='border-r-2 w-24 h-full p-2'>Name: </div><div className='w-full p-2'>{userData.name}</div>
      </div>
      {/* Add other user details in a similar manner... */}
    </div>
  );
};

export default function ResumePage() {
  return (
    <Suspense fallback={<Loading />}>
      <Resume />
    </Suspense>
  );
}
