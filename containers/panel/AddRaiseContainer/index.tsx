'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { salaryService } from '@/services/salary';
import { ISalaryEntry, ICreateRaise } from '@/types/ISalary';
import RaiseForm from '@/components/panel/RaiseForm';

interface AddRaiseContainerProps {
  entryId: string;
}

export default function AddRaiseContainer({ entryId }: AddRaiseContainerProps) {
  const router = useRouter();
  const [entry, setEntry] = useState<ISalaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEntry, setIsLoadingEntry] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEntry();
  }, [entryId]);

  const loadEntry = async () => {
    try {
      setIsLoadingEntry(true);
      const [error, data] = await salaryService.getEntry(entryId);

      if (error) {
        setError(error);
      } else if (data) {
        setEntry(data);
      }
    } catch (err) {
      setError('Failed to load salary entry '+ err);
    } finally {
      setIsLoadingEntry(false);
    }
  };

  const handleSubmit = async (data: ICreateRaise) => {
    try {
      setIsLoading(true);
      setError(null);

      const [error] = await salaryService.addRaise(entryId, data);

      if (error) {
        setError(error);
      } else {
        router.push(`/panel/salary-entries/${entryId}`);
      }
    } catch (err) {
      setError('Failed to add raise');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    const currencySymbols: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'CAD': 'C$',
      'AUD': 'A$',
      'SGD': 'S$',
      'INR': '₹',
      'JPY': '¥'
    };

    const symbol = currencySymbols[currency] || currency;
    return `${symbol}${amount.toLocaleString()}`;
  };

  if (isLoadingEntry) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Entry Not Found</h2>
        <p className="text-gray-600 mb-4">The salary entry you&apos;re looking for doesn&apos;t exist.</p>
        <button
          onClick={() => router.push('/panel/salary-entries')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium"
        >
          Back to Entries
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add Raise</h1>
        <p className="text-gray-600 mt-1">Record a salary increase for this position</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-medium text-blue-900 mb-1">
          {entry.position} ({entry.level})
        </h3>
        <p className="text-sm text-blue-700">
          {entry.company} • {entry.city} • Current Salary: {formatCurrency(entry.salary_min, entry.currency)}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <RaiseForm
        currentSalary={entry.salary_min}
        currency={entry.currency}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}