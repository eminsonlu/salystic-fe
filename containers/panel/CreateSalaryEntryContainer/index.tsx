'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { salaryService } from '@/services/salary';
import { ICreateSalaryEntry, IUpdateSalaryEntry } from '@/types/ISalary';
import SalaryEntryForm from '@/components/panel/SalaryEntryForm';

export default function CreateSalaryEntryContainer() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ICreateSalaryEntry | IUpdateSalaryEntry) => {
    try {
      setIsLoading(true);
      setError(null);

      if ('level' in data && 'position' in data && 'currency' in data) {
        const [error, result] = await salaryService.createEntry(data as ICreateSalaryEntry);

        if (error) {
          setError(error);
        } else if (result) {
          router.push('/panel/salary-entries');
        }
      } else {
        setError('Required fields are missing');
      }
    } catch (err) {
      setError('Failed to create salary entry');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Add New Salary Entry</h1>
        <p className="text-slate-600 mt-1">Record a new position or update your current salary information</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <SalaryEntryForm
        onSubmit={handleSubmit}
        isLoading={isLoading}
        submitText="Create Entry"
      />
    </div>
  );
}