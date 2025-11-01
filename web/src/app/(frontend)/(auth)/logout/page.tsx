"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('loggedInUser');
    
    router.push('/login'); 

  }, [router]);

  return (
    <div>
      <p>Saindo...</p>
    </div>
  );
}