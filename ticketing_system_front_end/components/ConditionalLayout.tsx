'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't show navbar on auth pages
  const isAuthPage = pathname?.startsWith('/auth');
  
  if (isAuthPage) {
    return (
      <div className="min-h-screen">
        <main className="relative">
          {children}
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="relative">
        {children}
      </main>
    </div>
  );
}