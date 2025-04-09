import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZooExplorer",
  description: "Your ultimate guide to the animal kingdom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Header */}
        <header className="bg-white shadow">
          <nav className="container mx-auto px-4 flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-gray-700">ZooExplorer</div>
            <ul className="flex space-x-6 text-gray-700">
              <li><a href="/home" className="hover:text-blue-700">Home</a></li>
              <li><a href="/about" className="hover:text-blue-700">About</a></li>
              <li><a href="/zoodetails" className="hover:text-blue-700">Zoo Details</a></li>
              <li><a href="/contact" className="hover:text-blue-700">Contact</a></li>
              <li><a href="/profile" className="hover:text-blue-700">Profile</a></li>
            </ul>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-grow">
          {children}
        </main>

        {/* Footer */}
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
      </body>
    </html>
  );
}