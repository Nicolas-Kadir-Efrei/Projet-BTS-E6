'use client';

import { useAuth } from '@/contexts/AuthContext';
import UserNavbar from '@/components/navigation/UserNavbar';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-black">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNavbar />
      <main>{children}</main>
    </div>
  );
}
