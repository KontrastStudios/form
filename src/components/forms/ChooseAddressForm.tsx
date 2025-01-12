import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { addressSchema } from '@/lib/schemas';
import type { AddressFormData } from '@/lib/types/form';
import { countries } from '@/lib/data/countries';
import { states } from '@/lib/data/states';
import { cn } from '@/lib/utils';

interface ChooseAddressFormProps {
  onSubmit: (data: AddressFormData) => void;
  className?: string;
}

export default function ChooseAddressForm({
  onSubmit,
  className,
}: ChooseAddressFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
  });

  const selectedCountry = watch('country');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn('space-y-4', className)}>
      <div className="space-y-2">
        <label htmlFor="street" className="text-sm font-medium text-gray-700">
          Street Address
        </label>
        <input
          {...register('street')}
          type="text"
          id="street"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.street && (
          <p className="text-sm text-red-500">{errors.street.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="city" className="text-sm font-medium text-gray-700">
          City
        </label>
        <input
          {...register('city')}
          type="text"
          id="city"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.city && (
          <p className="text-sm text-red-500">{errors.city.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="country" className="text-sm font-medium text-gray-700">
          Country
        </label>
        <select
          {...register('country')}
          id="country"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select country</option>
          {countries.map((country) => (
            <option key={country.value} value={country.value}>
              {country.label}
            </option>
          ))}
        </select>
        {errors.country && (
          <p className="text-sm text-red-500">{errors.country.message}</p>
        )}
      </div>

      {selectedCountry === 'US' && (
        <div className="space-y-2">
          <label htmlFor="state" className="text-sm font-medium text-gray-700">
            State
          </label>
          <select
            {...register('state')}
            id="state"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select state</option>
            {states.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="text-sm text-red-500">{errors.state.message}</p>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="zipCode" className="text-sm font-medium text-gray-700">
          ZIP Code
        </label>
        <input
          {...register('zipCode')}
          type="text"
          id="zipCode"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
        {errors.zipCode && (
          <p className="text-sm text-red-500">{errors.zipCode.message}</p>
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
