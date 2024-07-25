// components/NewInterview.js
"use client"
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { chatSession } from '@/utils/AIModel';
import { LoaderCircle } from 'lucide-react';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import { db } from '@/utils/db';
import { useRouter } from 'next/navigation';

function NewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [experience, setExperience] = useState([1]);
  const [jsonResponse, setJsonResponse] = useState([]);
  const { user } = useUser();
  const [jobPosition, setJobPosition] = useState();
  const [jobDescription, setJobDescription] = useState();

  const handleSliderChange = (value) => {
    setExperience(value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const InputPrompt = `Job Position: ` + jobPosition + `, Job Description: ` + jobDescription + ' and years of experience: ' + experience + '. based on this information give me 5 proper and realistic questions and ideal answers based on description and role mentioned also make sure they are according to experience level as well, give me questions and answers in JSON, give question and answers as field in JSON and i dont want anything extra because that can cause whitespace error for me';

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResponse = (await result.response.text()).replace('```json', '').replace('```', '');
    setJsonResponse(MockJsonResponse);

    if (MockJsonResponse) {
      const resp = await db.insert(MockInterview).values({
        mockId: uuidv4(),
        jsonMockResp: MockJsonResponse,
        jobPosition: jobPosition,
        jobDesc: jobDescription,
        jobExperience: experience[0].toString(),
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('YYYY-MM-DD'),
      }).returning({ mockId: MockInterview.mockId });

      if (resp) {
        setOpenDialog(false);
        router.push('/dashboard/interview/' + resp[0]?.mockId);
      }
    } else {
      console.log("error");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className='p-8 border rounded-lg hover:shadow-lg hover:bg-teal-100 hover:scale-105 transition-all cursor-pointer'
        onClick={() => setOpenDialog(true)}
      >
        <h2 className='font-light text-lg text-center'>+ Add New</h2>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl bg-white p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle className="text-3xl font-semibold text-gray-800">Tell us more about the role!</DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              <form onSubmit={onSubmit} className="space-y-6">
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-700'>Job Role</label>
                  <Input placeholder="Ex. Full stack developer, Machine learning Engineer..." onChange={(event) => setJobPosition(event.target.value)} required />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-700'>Job Description / Tech Stack</label>
                  <Textarea placeholder="Ex. Python, Node.js, React etc" onChange={(event) => setJobDescription(event.target.value)} required />
                </div>
                <div>
                  <label className='block mb-2 text-sm font-medium text-gray-700'>Years of experience</label>
                  <Slider
                    defaultValue={experience}
                    max={10}
                    step={1}
                    onValueChange={handleSliderChange}
                  />
                  <div className='mt-2 text-gray-700'>Selected Value: {experience[0]}</div>
                </div>
                <div className='flex justify-end space-x-3'>
                  <Button type="button" variant='ghost' onClick={() => setOpenDialog(false)}>Cancel</Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? <><LoaderCircle className='animate-spin' /> Initiating Interview process...</> : "Start Interview"}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default NewInterview;
