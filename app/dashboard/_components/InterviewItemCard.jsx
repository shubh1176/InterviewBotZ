// components/InterviewItemCard.js
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function InterviewItemCard({ interview }) {
    const router = useRouter();
    
    return (
        <div className="bg-white border shadow-lg rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl">
            <h2 className="font-bold text-xl text-blue-600">{interview?.jobPosition}</h2>
            <h2 className="text-sm text-gray-500">{interview?.jobExperience} Years of Experience</h2>
            <p className="text-sm text-gray-700 my-2">{interview?.jobDesc}</p>
            <h2 className="text-xs text-gray-500">Created At: {new Date(interview?.createdAt).toLocaleDateString()}</h2>
            <div className="mt-4">
                <Button variant="outline" onClick={() => router.push(`dashboard/interview/${interview?.mockId}/feedback`)}>
                    Feedback
                </Button>
            </div>
        </div>
    );
}
