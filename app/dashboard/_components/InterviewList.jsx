// components/InterviewList.js
"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {
    const [interviewList, setInterviewList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useUser();

    useEffect(() => {
        if (user) {
            GetInterviewList();
        }
    }, [user]);

    const GetInterviewList = async () => {
        setLoading(true);
        const result = await db.select()
            .from(MockInterview)
            .where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress))
            .orderBy(desc(MockInterview.id));

        setInterviewList(result);
        setLoading(false);
    }

    return (
        <div className="p-4">
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
                </div>
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3'>
                    {interviewList.length > 0 ? (
                        interviewList.map((interview, index) => (
                            <InterviewItemCard key={index} interview={interview} />
                        ))
                    ) : (
                        <div className="text-center col-span-full">
                            <p className="text-gray-500">No interviews found. Create a new mock interview to get started!</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default InterviewList;
