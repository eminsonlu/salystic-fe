'use client';

import { useState, useEffect } from 'react';
import { salaryService } from '@/services/salary';
import { ISalaryEntry } from '@/types/ISalary';
import SalaryEntriesList from '@/components/panel/SalaryEntriesList';
import Link from 'next/link';

export default function SalaryEntriesContainer() {
  const [entries, setEntries] = useState<ISalaryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      setIsLoading(true);
      const [error, data] = await salaryService.getEntries();
      if (error) {
        setError(error);
      } else if (data) {
        setEntries(data);
      }
    } catch (err) {
      setError('Failed to load salary entries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const [error] = await salaryService.deleteEntry(id);

      if (error) {
        alert('Failed to delete entry: ' + error);
      } else {
        setEntries(prev => prev.filter(entry => entry.id !== id));
      }
    } catch (err) {
      alert('Failed to delete entry');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Salary Entries</h1>
          <p className="text-gray-600 mt-1">Manage your salary history and track career progression</p>
        </div>
        <Link
          href="/panel/salary-entries/new"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
        >
          Add New Entry
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <SalaryEntriesList
        entries={entries}
        onDelete={handleDelete}
        isLoading={isLoading}
      />
    </div>
  );
}