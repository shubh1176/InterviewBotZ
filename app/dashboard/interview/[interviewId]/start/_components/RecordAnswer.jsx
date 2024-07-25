"use client"
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import { UserAnswer } from '@/utils/schema';
import { db } from '@/utils/db';
import { Mic } from 'lucide-react';
import { toast } from 'sonner';
import { chatSession } from '@/utils/AIModel';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

export default function RecordAnswer({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
    const [userAnswer, setUserAnswer] = useState('');
    const [loading, setLoading] = useState(false);

    const { user } = useUser();
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        results.forEach((result) => {
            setUserAnswer(prevAns => prevAns + result?.transcript);
        });
    }, [results]);

    useEffect(() => {
        if (!isRecording && userAnswer.length > 10) {
            UpdateUserAnswer();
        }
    }, [isRecording, userAnswer]);

    const AnswerRecording = async () => {
        if (isRecording) {
            setLoading(true);
            stopSpeechToText();
            if (userAnswer?.length < 10) {
                setLoading(false);
                toast('Error saving your response, try again');
                return;
            }
        } else {
            startSpeechToText();
        }
    };

    const UpdateUserAnswer = async () => {
        setLoading(true);
        console.log(userAnswer);
        const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}, User Answer: ${userAnswer}. Depending on question and answer for given interview question, please give us rating, feedback as area of improvement in about 3-5 lines, in JSON format with rating field and feedback field and give me only JSON, nothing more to avoid whitespace or any other kind of issue`;

        try {
            const result = await chatSession.sendMessage(feedbackPrompt);
            const mockJsonResponse = result.response.text().replace('```json', '').replace('```', '');
            console.log(mockJsonResponse);
            const JsonFeedbackResp = JSON.parse(mockJsonResponse);

            const resp = await db.insert(UserAnswer).values({
                mockIdRef: interviewData?.mockId,
                question: mockInterviewQuestion[activeQuestionIndex]?.question,
                correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
                userAnswer: userAnswer,
                feedback: JsonFeedbackResp?.feedback,
                rating: JsonFeedbackResp?.rating,
                userEmail: user?.primaryEmailAddress?.emailAddress,
                createdAt: moment().format('DD-MM-yyyy'),
            });

            if (resp) {
                toast('User Answer recorded successfully');
            }

            setUserAnswer('');
            setResults([]);
            setLoading(false);
        } catch (error) {
            console.error('Error updating user answer:', error);
            toast('Error saving your response, try again');
            setLoading(false);
        }
    };

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-col mt-20 justify-center relative'>
                <Image src={''} width={200} height={200} className="absolute top-0 left-0" alt="Background Image" />
                <Webcam mirrored={true} style={{
                    height: 300,
                    width: '100%',
                    zIndex: 10,
                    borderRadius: 20,
                }} />
            </div>
            <div>
                <Button disabled={loading} variant='outline' className="my-10" onClick={AnswerRecording}>
                    {isRecording ? <h2 className='text-red-600 flex gap-2'>
                        <Mic /> Recording...
                    </h2> : 'Record Answer'}
                </Button>
                <Button onClick={() => console.log(userAnswer)}>Show Answer</Button>
            </div>
        </div>
    );
}
