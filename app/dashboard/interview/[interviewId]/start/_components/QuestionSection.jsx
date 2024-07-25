import { Lightbulb, Volume2Icon } from 'lucide-react';
import React from 'react';

function QuestionSection({ mockInterviewQuestion, activeQuestionIndex }) {


    const textToSpeech=(text)=>{
        if('speechSynthesis' in window){
            const speech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        }
        else{
            alert('Sorry, your browser does not support text to speech')
        }
    }
  return mockInterviewQuestion&&(
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion && mockInterviewQuestion.map((question, index) => (
          <h2
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer 
              ${activeQuestionIndex === index ? 'bg-black text-white' : 'bg-secondary'}`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>
      <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>

      <Volume2Icon onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}
      className="hover:bg-slate-200 rounded-full"/>

      <div className='border rounded-lg p-5 bg-emerald-50 mt-20'>
        <h2 className='flex gap-2 items-center text-primary'>
            <Lightbulb/>
            <strong>Note:</strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>hello</h2>
      </div>
    </div>
  );
}

export default QuestionSection;
