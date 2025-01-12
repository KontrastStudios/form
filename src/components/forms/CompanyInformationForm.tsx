import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { companyInfoSchema } from '@/lib/schemas';
import type { CompanyInformationFormData } from '@/lib/types/form';
import { companyTypes } from '@/lib/data/company-types';
import { industries } from '@/lib/data/company-industries';
import { cn } from '@/lib/utils';

interface CompanyInformationFormProps {
  onSubmit: (data: CompanyInformationFormData) => void;
  className?: string;
}

export default function CompanyInformationForm({
  onSubmit,
  className,
}: CompanyInformationFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CompanyInformationFormData>({
    resolver: zodResolver(companyInfoSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4', className)}>
      <div className="space-y-2">
        <label htmlFor="companyName" className="text-sm font-medium text-gray-700">
          Company Name
        </label>
        <input
          {...register('companyName')}
          type="text"
          id="companyName"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.companyName && (
          <p className="text-sm text-red-500">{errors.companyName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="companyType" className="text-sm font-medium text-gray-700">
          Company Type
        </label>
        <select
          {...register('companyType')}
          id="companyType"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select company type</option>
          {companyTypes.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        {errors.companyType && (
          <p className="text-sm text-red-500">{errors.companyType.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="industry" className="text-sm font-medium text-gray-700">
          Industry
        </label>
        <select
          {...register('industry')}
          id="industry"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select industry</option>
          {industries.map((industry) => (
            <option key={industry.value} value={industry.value}>
              {industry.label}
            </option>
          ))}
        </select>
        {errors.industry && (
          <p className="text-sm text-red-500">{errors.industry.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="employeeCount" className="text-sm font-medium text-gray-700">
          Number of Employees
        </label>
        <input
          {...register('employeeCount', { valueAsNumber: true })}
          type="number"
          id="employeeCount"
          min="1"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.employeeCount && (
          <p className="text-sm text-red-500">{errors.employeeCount.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Continue
      </button>
    </form>
  );
}
