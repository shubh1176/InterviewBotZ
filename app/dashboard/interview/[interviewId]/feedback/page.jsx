"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

function Feedback({ params }) {
  const [feedbackList, setFeedbackList] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const router = useRouter();

  useEffect(() => {
    GetFeedback();
  }, []);

  const GetFeedback = async () => {
    const result = await db.select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);

    console.log(result);
    setFeedbackList(result);

    const totalRating = result.reduce((sum, item) => sum + item.rating, 0);
    const average = totalRating / result.length;
    setAverageRating(average.toFixed(1));
  }

  const getRatingColor = (rating) => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 5) return 'text-yellow-500';
    if (rating >= 3) return 'text-orange-500';
    return 'text-red-500';
  };

  const getRatingBgColor = (rating) => {
    if (rating >= 8) return 'bg-green-100';
    if (rating >= 5) return 'bg-yellow-100';
    if (rating >= 3) return 'bg-orange-100';
    return 'bg-red-100';
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className='text-2xl font-bold text-green-500 mb-3 text-center'>
        Thank you for taking the interview!
      </h2>
      <p className='font-semibold text-xl mb-5 text-center'>Here is your interview feedback</p>

      <h2 className='text-primary mb-6 text-lg text-center'>Your overall rating: <strong>{averageRating}</strong>/10</h2>

      <p className='text-sm text-gray-500 text-center mb-4'>Detailed report:</p>
      
      {feedbackList && feedbackList.map((item, index) => (
        <Collapsible key={index} className='mb-4'>
          <CollapsibleTrigger className='flex justify-between items-center p-4 bg-secondary text-black rounded-lg cursor-pointer'>
            <span className='text-lg font-medium'>{item.question}</span>
            <ChevronsUpDown className='h-5 w-5' />
          </CollapsibleTrigger>
          <CollapsibleContent className='p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700'>
            <div className='mb-4'>
              <h2 className='mb-2 text-xl font-semibold text-gray-900 dark:text-white'>User Answer:</h2>
              <p className='p-2 rounded-md bg-red-100 text-gray-700 dark:text-gray-300'>{item.userAnswer}</p>
            </div>
            <div className='mb-4'>
              <h2 className='mb-2 text-xl font-semibold text-gray-900 dark:text-white'>Ideal Answer:</h2>
              <p className='p-2 rounded-md bg-green-100 text-gray-700 dark:text-gray-300'>{item.correctAns}</p>
            </div>
            <div className='mb-4'>
              <h2 className={`mb-2 text-xl font-semibold ${getRatingColor(item.rating)} dark:text-white`}>Rating:</h2>
              <p className={`p-2 rounded-md ${getRatingBgColor(item.rating)} text-gray-700 dark:text-gray-300`}>{item.rating}</p>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
      
      <div className="flex justify-center mt-6">
        <Button onClick={() => router.replace('/dashboard')}>Go Home</Button>
      </div>
    </div>
  );
}

export default Feedback
