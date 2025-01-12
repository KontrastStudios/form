import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
}

interface MultistepNavigationButtonsProps {
  onBack: () => void;
  onNext: () => void;
  backButtonProps?: ButtonProps;
  nextButtonProps?: ButtonProps;
  className?: string;
}

export function MultistepNavigationButtons({
  onBack,
  onNext,
  backButtonProps,
  nextButtonProps,
  className,
}: MultistepNavigationButtonsProps) {
  return (
    <div className={cn('mt-8 flex items-center justify-between gap-4', className)}>
      <button
        className={cn(
          'rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          backButtonProps?.isDisabled && 'cursor-not-allowed opacity-50'
        )}
        disabled={backButtonProps?.isDisabled}
        onClick={onBack}
        type="button"
        {...backButtonProps}
      >
        Back
      </button>

      <button
        className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={onNext}
        type="button"
        {...nextButtonProps}
      >
        {nextButtonProps?.children || 'Continue'}
      </button>
    </div>
  );
}
