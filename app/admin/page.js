"use client";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    animals: 0,
    users: 0
  });

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'Admin') {
      router.push('/');
    }
  }, [session, status, router]);

  useEffect(() => {
    // Fetch dashboard stats
    async function fetchStats() {
      try {
        // Fetch animal data
        const animalsRes = await fetch('/api/animals');
        const animalsData = await animalsRes.json();
        
        // Fetch user data
        const usersRes = await fetch('/api/users');
        const usersData = await usersRes.json();
        
        setStats({
          animals: animalsData.length,
          users: usersData.length
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    }
    
    if (status === 'authenticated' && session?.user?.role === 'Admin') {
      fetchStats();
    }
  }, [status, session]);

  if (status === 'loading') {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (status !== 'authenticated' || session?.user?.role !== 'Admin') {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      {/* Stats Cards - Only Animals and Users */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700">Animals</h2>
          <p className="text-3xl font-bold mt-2">{stats.animals}</p>
          <Link href="/admin/animals" className="text-blue-600 hover:underline block mt-4">
            Manage Animals →
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-700">Users</h2>
          <p className="text-3xl font-bold mt-2">{stats.users}</p>
          <Link href="/admin/users" className="text-blue-600 hover:underline block mt-4">
            Manage Users →
          </Link>
        </div>
      </div>
      
      {/* Quick Actions - Simplified */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/admin/animals" className="bg-blue-100 hover:bg-blue-200 p-4 rounded-lg text-center">
            <div className="text-blue-700 font-medium">Add New Animal</div>
          </Link>
          <Link href="/" className="bg-purple-100 hover:bg-purple-200 p-4 rounded-lg text-center">
            <div className="text-purple-700 font-medium">View Website</div>
          </Link>
        </div>
      </div>
    </div>
  );
}