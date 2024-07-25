"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';

function Interview({ params }) {
    const [interviewData, setInterviewData] = useState(null);
    const [cameraEnabled, setCameraEnabled] = useState(false);

    useEffect(() => {
        GetInterviewDetails();
    }, []);

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId));
        setInterviewData(result[0]);
    };

    return (
        <div className='my-6'>
            <h2 className='font-bold text-2xl'>Let's get started!</h2>
            <div>
                {cameraEnabled ? (
                    <Webcam
                        onUserMedia={() => { setCameraEnabled(true); }}
                        onUserMediaError={() => { setCameraEnabled(false); }}
                        mirrored={true}
                        style={{
                            height: 300,
                            width: 300
                        }}
                    />
                ) : (
                    <>
                        <WebcamIcon className='h-44 w-44 p-10 bg-secondary rounded-lg'></WebcamIcon>
                        <Button variant="ghost" onClick={() => setCameraEnabled(true)}>Enable webcam and microphone</Button>
                    </>
                )}
            </div>
            {interviewData && (
                <div className='flex flex-col my-5 gap-5'>
                    <h2 className='text-lg'><strong>Job Role: </strong>{interviewData.jobPosition}</h2>
                    <h2 className='text-lg'><strong>Job Description: </strong>{interviewData.jobDesc}</h2>
                    <h2 className='text-lg'><strong>Experience: </strong>{interviewData.jobExperience}</h2>
                </div>
            )}
            <div className='p-5 border rounded-lg border-teal-200 bg-emerald-100'>
                <h2 className='flex gap-2 items-center p-1'><Lightbulb></Lightbulb><p>Information</p></h2>
                <p>The Mock interview requires WebCam and Mic access</p>
            </div>
            <div className='p-3'>
                <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
                <Button>Start</Button>
                </Link>
            </div>
        </div>
    );
}

export default Interview;
