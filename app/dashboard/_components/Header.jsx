// components/Header.js
"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'

function Header() {
  const router = useRouter()
    const path = usePathname();

    useEffect(() => {
        console.log(path)
    }, [path])

    return (
        <div className="sticky top-0 z-50 flex p-4 items-center justify-between bg-white shadow-md">
            <div className="flex items-center space-x-2">
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
                    Interview
                </div>
                <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
                    Botz
                </div>
            </div>

            <ul className="hidden md:flex gap-6 items-center">
                <li className={`hover:font-bold transition-all hover:text-blue-500 cursor-pointer ${path == '/dashboard' && 'text-blue-500 font-bold'}`}>
                    <span className="flex items-center gap-2" onClick={()=>router.push('/dashboard')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18m-9 5h9" />
                        </svg>
                        Dashboard
                    </span>
                </li>
                <li className={`hover:font-bold transition-all hover:text-blue-500 cursor-pointer ${path == '/how' && 'text-blue-500 font-bold'}`}>
                    <span className="flex items-center gap-2" onClick={()=>router.push('/dashboard')}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12c0-4.418-3.582-8-8-8S5 7.582 5 12s3.582 8 8 8 8-3.582 8-8z" />
                        </svg>
                        How it works?
                    </span>
                </li>
            </ul>
            <UserButton />
        </div>
    )
}

export default Header
