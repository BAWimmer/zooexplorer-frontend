"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function AdminLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'Admin') {
      router.push('/');
    } else if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'authenticated' && session?.user?.role === 'Admin') {
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white">
          <div className="p-4">
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          </div>
          <nav className="mt-6">
            <Link href="/admin/animals" className="block py-3 px-4 hover:bg-gray-700">
              Animal Management
            </Link>
            <Link href="/admin/users" className="block py-3 px-4 hover:bg-gray-700">
              User Management
            </Link>
            <Link href="/home" className="block py-3 px-4 hover:bg-gray-700">
              Back to Site
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="bg-white shadow p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-semibold">Zoo Explorer Admin</h1>
              <div className="text-sm">
                Logged in as: <span className="font-medium">{session.user.name || session.user.email}</span>
              </div>
            </div>
          </header>
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    );
  }

  return null; // This will only show briefly before redirect
}