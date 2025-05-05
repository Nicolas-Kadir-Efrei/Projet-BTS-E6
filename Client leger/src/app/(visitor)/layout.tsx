import { ReactNode } from 'react';
import Navbar from '@/components/ui/Navbar';

interface VisitorLayoutProps {
  children: ReactNode;
}

export default function VisitorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
