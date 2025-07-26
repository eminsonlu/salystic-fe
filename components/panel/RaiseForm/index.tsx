'use client';

import { useState } from 'react';
import { ICreateRaise } from '@/types/ISalary';
import Input from '@/components/shared/Input';

interface RaiseFormProps {
  currentSalary: number;
  currency: string;
  onSubmit: (data: ICreateRaise) => void;
  isLoading?: boolean;
}

export default function RaiseForm({ currentSalary, currency, onSubmit, isLoading = false }: RaiseFormProps) {
  const [formData, setFormData] = useState({
    raiseDate: '',
    newSalary: 0,
    percentage: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const formatCurrency = (amount: number) => {
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

  const calculatePercentage = (newSalary: number) => {
    if (newSalary <= 0 || currentSalary <= 0) return 0;
    return Math.round(((newSalary - currentSalary) / currentSalary) * 100);
  };

  const calculateNewSalary = (percentage: number) => {
    if (percentage <= 0 || currentSalary <= 0) return currentSalary;
    return Math.round(currentSalary * (1 + percentage / 100));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.raiseDate) {
      newErrors.raiseDate = 'Raise date is required';
    }

    if (!formData.newSalary || formData.newSalary <= currentSalary) {
      newErrors.newSalary = 'New salary must be greater than current salary';
    }

    if (!formData.percentage || formData.percentage <= 0) {
      newErrors.percentage = 'Percentage must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = {
      raiseDate: new Date(formData.raiseDate).toISOString(),
      newSalary: formData.newSalary,
      percentage: formData.percentage,
    };

    onSubmit(submitData);
  };

  const handleNewSalaryChange = (value: number) => {
    const percentage = calculatePercentage(value);
    setFormData(prev => ({
      ...prev,
      newSalary: value,
      percentage: percentage
    }));

    if (errors.newSalary) {
      setErrors(prev => ({ ...prev, newSalary: '' }));
    }
    if (errors.percentage) {
      setErrors(prev => ({ ...prev, percentage: '' }));
    }
  };

  const handlePercentageChange = (value: number) => {
    const newSalary = calculateNewSalary(value);
    setFormData(prev => ({
      ...prev,
      percentage: value,
      newSalary: newSalary
    }));

    if (errors.percentage) {
      setErrors(prev => ({ ...prev, percentage: '' }));
    }
    if (errors.newSalary) {
      setErrors(prev => ({ ...prev, newSalary: '' }));
    }
  };

  const handleDateChange = (value: string) => {
    setFormData(prev => ({ ...prev, raiseDate: value }));
    if (errors.raiseDate) {
      setErrors(prev => ({ ...prev, raiseDate: '' }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Add Raise</h3>
        <p className="text-sm text-gray-600">
          Current Salary: <span className="font-medium">{formatCurrency(currentSalary)}</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Raise Date *
          </label>
          <Input
            type="date"
            value={formData.raiseDate}
            onChange={(e) => handleDateChange(e.target.value)}
            className={errors.raiseDate ? 'border-red-500' : ''}
          />
          {errors.raiseDate && <p className="text-red-500 text-sm mt-1">{errors.raiseDate}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              New Salary *
            </label>
            <Input
              type="number"
              min={currentSalary + 1}
              step="1"
              value={formData.newSalary || ''}
              onChange={(e) => handleNewSalaryChange(parseInt(e.target.value) || 0)}
              className={errors.newSalary ? 'border-red-500' : ''}
              placeholder={`Minimum: ${formatCurrency(currentSalary + 1)}`}
            />
            {errors.newSalary && <p className="text-red-500 text-sm mt-1">{errors.newSalary}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Raise Percentage *
            </label>
            <div className="relative">
              <Input
                type="number"
                min="0.1"
                step="0.1"
                value={formData.percentage || ''}
                onChange={(e) => handlePercentageChange(parseFloat(e.target.value) || 0)}
                className={`pr-8`}
                placeholder="e.g., 10.5"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 text-sm">%</span>
              </div>
            </div>
            {errors.percentage && <p className="text-red-500 text-sm mt-1">{errors.percentage}</p>}
          </div>
        </div>

        {formData.newSalary > currentSalary && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-blue-900 mb-2">Raise Summary</h4>
            <div className="space-y-1 text-sm text-blue-800">
              <div className="flex justify-between">
                <span>Current Salary:</span>
                <span>{formatCurrency(currentSalary)}</span>
              </div>
              <div className="flex justify-between">
                <span>New Salary:</span>
                <span className="font-medium">{formatCurrency(formData.newSalary)}</span>
              </div>
              <div className="flex justify-between font-medium border-t border-blue-200 pt-1">
                <span>Increase:</span>
                <span className="text-green-700">
                  +{formatCurrency(formData.newSalary - currentSalary)} ({formData.percentage}%)
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-2 rounded-md font-medium"
          >
            {isLoading ? 'Adding Raise...' : 'Add Raise'}
          </button>
        </div>
      </form>
    </div>
  );
}
