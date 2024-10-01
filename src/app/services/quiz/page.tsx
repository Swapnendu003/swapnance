// app/quiz/page.tsx

'use client';

import React, { useState, useRef } from 'react';
import { CopilotSidebar } from '@copilotkit/react-ui';
import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import '@copilotkit/react-ui/styles.css';
import html2canvas from 'html2canvas';
import InvestmentBadge from '@/components/InvestmentBadge';

const QuizPage: React.FC = () => {
const userName = 'Investor Buddy';
  const [quizQuestion, setQuizQuestion] = useState('');
  const [quizOptions, setQuizOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [tier, setTier] = useState('Visionary Vanguard');
  const [badgeUrl, setBadgeUrl] = useState<string | null>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // Using CopilotReadable to provide application context
  useCopilotReadable({
    description: "User's name",
    value: userName,
  });

  useCopilotReadable({
    description: "Generated quiz question",
    value: quizQuestion,
  });

  useCopilotReadable({
    description: "Options for the quiz question",
    value: JSON.stringify(quizOptions),
  });

  useCopilotReadable({
    description: "User's answer to the quiz question",
    value: userAnswer ?? '',
  });

  // Copilot action to generate the quiz question
  useCopilotAction({
    name: 'generateQuizQuestion',
    description: 'Generate a single investment-related quiz question with four options and indicate the correct answer.',
    parameters: [
      {
        name: 'question',
        type: 'string',
        description: 'The question for the quiz.',
        required: true,
      },
      {
        name: 'options',
        type: 'string[]',
        description: 'An array of four options for the quiz question.',
        required: true,
      },
      {
        name: 'correctAnswer',
        type: 'string',
        description: 'The correct answer for the quiz question.',
        required: true,
      },
    ],
    handler: async ({ question, options, correctAnswer }: { question: string; options: string[]; correctAnswer: string }) => {
      setQuizQuestion(question);
      setQuizOptions(options);
      setCorrectAnswer(correctAnswer);
      setIsCorrect(null);
      return 'Quiz question generated successfully.';
    },
  });

  // Copilot action to validate the quiz answer
  useCopilotAction({
    name: 'validateQuizAnswer',
    description: 'Validate the user\'s answer to the quiz question.',
    parameters: [
      {
        name: 'answer',
        type: 'string',
        description: 'The user\'s answer to the quiz question.',
        required: true,
      },
    ],
    handler: async ({ answer }: { answer: string }) => {
      const formattedAnswer = answer.trim().toLowerCase();
      const formattedCorrectAnswer = correctAnswer.trim().toLowerCase();

      if (formattedAnswer === formattedCorrectAnswer) {
        setIsCorrect(true);
        setTier('Visionary Vanguard'); // Assign a specific tier based on the correct answer
        generateBadge(); // Generate badge when answer is correct
        return 'Correct answer!';
      } else {
        setIsCorrect(false);
        return 'Incorrect answer. Please try again.';
      }
    },
  });

  // Function to generate the badge image
  const generateBadge = () => {
    if (badgeRef.current) {
      html2canvas(badgeRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        setBadgeUrl(imgData);
      });
    }
  };

  // Function to handle the download of the badge
  const handleDownload = () => {
    if (badgeUrl) {
      const link = document.createElement('a');
      link.href = badgeUrl;
      link.download = 'investment-badge.png';
      link.click();
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-20 px-6 md:px-20 bg-gradient-to-tr from-green-200 to-green-50 text-gray-900 relative overflow-hidden">
      {/* Bubble Animations */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>

      {/* Header Section */}
      <motion.div
        className="flex flex-col items-center mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-center text-green-800">
          Investment Quiz Challenge
        </h1>
        {userName && (
          <p className="text-xl text-green-800 mt-2">Welcome, {userName}!</p>
        )}
        <p className="text-lg md:text-xl text-center text-green-700 max-w-2xl">
          Click on the Copilot Sidebar to start and earn your personalized investor badge!
        </p>
      </motion.div>

      {/* Quiz Question */}
      {quizQuestion && (
        <motion.div
          className="w-full max-w-4xl bg-white shadow-xl rounded-3xl p-8 mb-16 relative"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-4 text-green-800">{quizQuestion}</h2>
          <ul className="list-disc list-inside space-y-2">
            {quizOptions.map((option, index) => (
              <li
                key={index}
                className={`text-lg cursor-pointer text-gray-700 hover:text-green-700 transition-colors duration-200`}
                onClick={() => {
                  setUserAnswer(option);
                  setIsCorrect(null); // Reset previous result
                  //validateQuizAnswer(option); // Trigger Copilot action
                }}
              >
                {option}
              </li>
            ))}
          </ul>
          {isCorrect === false && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mt-8 text-center"
            >
              <p className="text-xl font-bold text-red-600">
                Aww Snap! 🐂 Bull needs more run! Try again!
              </p>
              <motion.div
                className="mt-4 text-5xl"
                initial={{ x: -10 }}
                animate={{ x: [0, -10, 10, -10, 0] }}
                transition={{ repeat: 3, duration: 0.2 }}
              >
                🐂
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Correct Answer and Badge */}
      {isCorrect && (
        <motion.div
          className="flex flex-col items-center space-y-4 bg-white p-8 rounded-3xl shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-2xl font-semibold text-green-700">
            Congratulations, {userName}! Your answer is correct.
          </p>
          <div ref={badgeRef} className="mb-4">
            <InvestmentBadge name={userName} tier={tier} />
          </div>
          {badgeUrl && (
            <button
              onClick={handleDownload}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              <Download className="mr-2" /> Download Your Badge
            </button>
          )}
        </motion.div>
      )}

      {/* Copilot Sidebar for Quiz Assistance */}
      <CopilotSidebar
        labels={{
          title: 'Your Quiz Assistant',
          initial: 'Please enter your name to start the quiz.',
        }}
        instructions={`You are assisting users to participate in a single-question investment quiz.

Step 1: Ask the user for their name and call 'setUserName' to set it.
Step 2: Generate an investment-related quiz question with multiple-choice options.
Step 3: Display the question and allow the user to submit their answer through the Copilot.
Step 4: Validate the user's answer and provide appropriate feedback.`}
        defaultOpen={false}
        shortcut="/quiz"
      >
        {/* Copilot will handle the name input and generate questions */}
        
      </CopilotSidebar>
    </div>
  );
};

export default QuizPage;
