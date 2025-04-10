"use client";
import { usePathname } from 'next/navigation';
import NavbarClient from './NavbarClient';

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/signin' || pathname === '/signup';

  return (
    <>
      {/* Header - only on non-auth pages */}
      {!isAuthPage && (
        <header className="bg-white shadow">
          <NavbarClient />
        </header>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer - only on non-auth pages */}
      {!isAuthPage && (
        <footer id="contact" className="bg-gray-800 text-white py-8">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p>
              For inquiries, please email us at{" "}
              <a href="mailto:info@zooexplorer.com" className="underline hover:text-blue-400">
                info@zooexplorer.com
              </a>
            </p>
            <p className="mt-4">
              &copy; {new Date().getFullYear()} ZooExplorer. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </>
  );
}