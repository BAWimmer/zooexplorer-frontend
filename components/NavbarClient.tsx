// Navbar component for site navigation.

"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function NavbarClient() {
  const { data: session } = useSession();
  
  return (
    <nav className="container mx-auto px-4 flex justify-between items-center h-16">
      <div className="text-2xl font-bold text-gray-700">ZooExplorer</div>
      <ul className="flex space-x-6 text-gray-700">
        <li><Link href="/home" className="hover:text-blue-700">Home</Link></li>
        <li><Link href="/about" className="hover:text-blue-700">About</Link></li>
        <li><Link href="/zoodetails" className="hover:text-blue-700">Zoo Details</Link></li>
        <li><Link href="/contact" className="hover:text-blue-700">Contact</Link></li>
        <li><Link href="/profile" className="hover:text-blue-700">Profile</Link></li>
        {session?.user?.role === "Admin" && (
          <li><Link href="/admin" className="text-blue-700 font-semibold hover:text-blue-900">Admin</Link></li>
        )}
        {session ? (
          <li>
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="text-red-600 hover:text-red-800 font-semibold"
            >
              Sign Out
            </button>
          </li>
        ) : (
          <li><Link href="/signin" className="text-blue-700 font-semibold hover:text-blue-900">Sign In</Link></li>
        )}
      </ul>
    </nav>
  );
}