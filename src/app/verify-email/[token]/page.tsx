"use client"
import { useEffect, useState } from 'react';
import { useRouter } from '../../../../node_modules/next/navigation';
import axios from 'axios';

const VerifyEmail = ({params}:any) => {
  const [message, setMessage] = useState('');
  const router = useRouter();
  const  token  = params.token

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      // Make sure to call the correct endpoint
      const res = await axios.get(`/api/verify-email/${token}`);
      setMessage(res.data.message);

    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
