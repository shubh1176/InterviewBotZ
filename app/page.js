// pages/index.js
"use client"
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-400 to-purple-500">
      <header className="sticky top-0 bg-white shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
              Interview
            </div>
            <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
              Botz
            </div>
          </div>
          <nav className="hidden md:flex space-x-4">
            <Button className="bg-blue-500 hover:bg-blue-700 text-white" onClick={() => router.push('/dashboard')}>Sign Up</Button>
            <Button className="bg-green-500 hover:bg-green-700 text-white" onClick={() => router.push('/dashboard')}>Sign In</Button>
          </nav>
          <button className="md:hidden text-gray-800" onClick={() => setShowMenu(!showMenu)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={showMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
            </svg>
          </button>
        </div>
        {showMenu && (
          <nav className="md:hidden bg-white shadow-md">
            <Button className="w-full bg-blue-500 hover:bg-blue-700 text-white" onClick={() => router.push('/dashboard')}>Sign Up</Button>
            <Button className="w-full bg-green-500 hover:bg-green-700 text-white" onClick={() => router.push('/dashboard')}>Sign In</Button>
          </nav>
        )}
      </header>

      <main className="flex-grow">
        <section className="relative h-screen bg-cover bg-center flex items-center justify-center text-center px-4">
          <div className="relative z-10 text-white">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">Welcome to InterviewBotz</h1>
            <p className="text-lg mb-8 animate-fade-in delay-1s">The best AI-powered interview mocker.</p>
            <Button className="bg-blue-500 hover:bg-blue-700 text-white" onClick={() => router.push('/dashboard')}>Get Started</Button>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 InterviewBotz. All rights reserved.</p>
          <div className="flex justify-center mt-4 space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <Image src="/facebook-icon.png" alt="Facebook" width={24} height={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Image src="/twitter-icon.png" alt="Twitter" width={24} height={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <Image src="/linkedin-icon.png" alt="LinkedIn" width={24} height={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
