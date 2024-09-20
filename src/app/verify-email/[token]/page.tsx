"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';

interface VerifyEmailProps {
  params: {
    token: string;
  };
}

const VerifyEmail = ({ params }: VerifyEmailProps) => {
  const [message, setMessage] = useState<string>('');
  const { token } = params;

  useEffect(() => {
    const verifyEmail = async () => {
      try {
       
        const res = await axios.get(`/api/verify-email/${token}`);
        setMessage(res.data.message);
      } catch (err: unknown) {
        setMessage(err.response?.data?.message || 'Verification failed');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

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
