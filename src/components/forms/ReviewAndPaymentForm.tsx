import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentSchema } from '@/lib/schemas';
import type { PaymentFormData, FormState } from '@/lib/types/form';
import { cn } from '@/lib/utils';

interface ReviewAndPaymentFormProps {
  formData: Omit<FormState, 'payment'>;
  onSubmit: (data: PaymentFormData) => void;
  className?: string;
}

export default function ReviewAndPaymentForm({
  formData,
  onSubmit,
  className,
}: ReviewAndPaymentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
  });

  return (
    <div className={cn('space-y-8', className)}>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Review Your Information</h2>
        
        <div className="rounded-lg border border-gray-200 p-4">
          <h3 className="mb-3 font-medium">Account Details</h3>
          <p className="text-gray-600">Email: {formData.signUp.email}</p>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <h3 className="mb-3 font-medium">Company Information</h3>
          <div className="space-y-2 text-gray-600">
            <p>Company Name: {formData.companyInfo.companyName}</p>
            <p>Company Type: {formData.companyInfo.companyType}</p>
            <p>Industry: {formData.companyInfo.industry}</p>
            <p>Employees: {formData.companyInfo.employeeCount}</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <h3 className="mb-3 font-medium">Address</h3>
          <div className="space-y-2 text-gray-600">
            <p>{formData.address.street}</p>
            <p>
              {formData.address.city}, {formData.address.state}{' '}
              {formData.address.zipCode}
            </p>
            <p>{formData.address.country}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-xl font-semibold">Payment Information</h2>

        <div className="space-y-2">
          <label htmlFor="cardNumber" className="text-sm font-medium text-gray-700">
            Card Number
          </label>
          <input
            {...register('cardNumber')}
            type="text"
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.cardNumber && (
            <p className="text-sm text-red-500">{errors.cardNumber.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="expiryDate" className="text-sm font-medium text-gray-700">
              Expiry Date
            </label>
            <input
              {...register('expiryDate')}
              type="text"
              id="expiryDate"
              placeholder="MM/YY"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.expiryDate && (
              <p className="text-sm text-red-500">{errors.expiryDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="cvv" className="text-sm font-medium text-gray-700">
              CVV
            </label>
            <input
              {...register('cvv')}
              type="text"
              id="cvv"
              placeholder="123"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
            />
            {errors.cvv && (
              <p className="text-sm text-red-500">{errors.cvv.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="nameOnCard" className="text-sm font-medium text-gray-700">
            Name on Card
          </label>
          <input
            {...register('nameOnCard')}
            type="text"
            id="nameOnCard"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
          {errors.nameOnCard && (
            <p className="text-sm text-red-500">{errors.nameOnCard.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Complete Payment
        </button>
      </form>
    </div>
  );
}
