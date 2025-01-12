import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StepProps {
  stepNumber: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  onClick?: () => void;
}

function Step({
  stepNumber,
  title,
  description,
  isActive,
  isCompleted,
  onClick,
}: StepProps) {
  return (
    <li className="relative flex gap-x-4">
      <div
        className={cn(
          'absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full',
          isActive
            ? 'bg-blue-500 text-white'
            : isCompleted
            ? 'bg-green-500 text-white'
            : 'border-2 border-gray-300 bg-white text-gray-500'
        )}
        onClick={onClick}
        role="button"
        tabIndex={0}
      >
        {isCompleted ? (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        ) : (
          stepNumber
        )}
      </div>

      <div className="flex-auto py-0.5 text-left">
        <span
          className={cn(
            'text-sm font-medium',
            isActive ? 'text-blue-500' : 'text-gray-900'
          )}
        >
          {title}
        </span>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </li>
  );
}

interface MultistepSidebarProps {
  currentPage: number;
  onChangePage: (page: number) => void;
  onBack: () => void;
  onNext: () => void;
  children: React.ReactNode;
}

export function MultistepSidebar({
  currentPage,
  onChangePage,
  children,
}: MultistepSidebarProps) {
  const steps = [
    {
      title: 'Sign Up',
      description: 'Create your account',
    },
    {
      title: 'Company Information',
      description: 'Tell us about your business',
    },
    {
      title: 'Business Address',
      description: 'Where are you located?',
    },
    {
      title: 'Review & Payment',
      description: 'Complete your registration',
    },
  ];

  return (
    <div className="lg:flex">
      <aside className="flex-none border-r border-gray-200 bg-gray-50 p-8 lg:w-96">
        <nav>
          <ul className="space-y-6">
            {steps.map((step, index) => (
              <Step
                key={step.title}
                description={step.description}
                isActive={currentPage === index}
                isCompleted={currentPage > index}
                onClick={() => onChangePage(index)}
                stepNumber={index + 1}
                title={step.title}
              />
            ))}
          </ul>
        </nav>
      </aside>

      <main className="flex-1 px-8 py-8 lg:px-12">{children}</main>
    </div>
  );
}
