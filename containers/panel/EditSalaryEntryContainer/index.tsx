'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { salaryService } from '@/services/salary';
import { ISalaryEntry, IUpdateSalaryEntry } from '@/types/ISalary';
import SalaryEntryForm from '@/components/panel/SalaryEntryForm';

interface EditSalaryEntryContainerProps {
  entryId: string;
}

export default function EditSalaryEntryContainer({ entryId }: EditSalaryEntryContainerProps) {
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
      setError('Failed to load salary entry');
    } finally {
      setIsLoadingEntry(false);
    }
  };

  const handleSubmit = async (data: IUpdateSalaryEntry) => {
    try {
      setIsLoading(true);
      setError(null);

      const [error, result] = await salaryService.updateEntry(entryId, data);

      if (error) {
        setError(error);
      } else if (result) {
        router.push('/panel/salary-entries');
      }
    } catch (err) {
      setError('Failed to update salary entry');
    } finally {
      setIsLoading(false);
    }
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
        <h1 className="text-2xl font-bold text-gray-900">Edit Salary Entry</h1>
        <p className="text-gray-600 mt-1">Update your salary entry information</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <SalaryEntryForm
          initialData={entry}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitText="Update Entry"
        />
      </div>
    </div>
  );
}