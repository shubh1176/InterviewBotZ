import { UserButton } from '@clerk/nextjs'
import React from 'react'
import InterviewList from './_components/InterviewList'
import NewInterview from './_components/NewInterview'


function Dashboard() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-2xl'>
        Dashboard
      </h2> 
      <h2 className='text-#50B498'>
        Create A Mock Interview
      </h2> 
      <div className='grid grid-col-1 md:grid-cols-3 my-5'>
        <NewInterview />
      </div>
      <div className='flex flex-col gap-4 mt-20'>
        <h2 className='font-mono text-gray-500'>Previous Interview Feedback</h2>
        <div>
          <InterviewList />
        </div>

      </div>

    </div>
  )
}

export default Dashboard
