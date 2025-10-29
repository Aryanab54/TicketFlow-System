'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Zap } from 'lucide-react';

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/auth/login');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
        <div className="relative text-center">
          <div className="inline-flex p-4 bg-white/20 backdrop-blur-lg rounded-2xl mb-6">
            <Zap className="h-12 w-12 text-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">TicketFlow</h1>
          <p className="text-white/80 text-lg">Loading your experience...</p>
          <div className="mt-6">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}