'use client';

import { useState, useEffect } from 'react';
import { BarChart3, DollarSign, TrendingUp, Percent, Plus, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { salaryService } from '@/services/salary';
import { ISalaryEntry } from '@/types/ISalary';
import Link from 'next/link';
import { constantsService } from '@/services';

export default function PanelDashboardContainer() {
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

  const formatCurrency = (amount: number, currency: string) => {
    if (amount === null || amount === undefined) return 'N/A';
    if (amount === 0) return '0';
    if (isNaN(amount)) return 'Invalid Amount';

    const currencies: Record<string, string> = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'TRY': '₺',
    }

    return `${currencies[currency] || '$'}${amount.toLocaleString()}`;
  };

  const calculateStats = () => {
    if (entries.length === 0) {
      return {
        totalEntries: 0,
        currentSalary: 0,
        totalRaises: 0,
        avgRaisePercentage: 0
      };
    }

    const currentEntries = entries.filter(entry => !entry.end_time);
    const totalRaises = entries.reduce((sum, entry) => sum + (entry.raises?.length || 0), 0);

    const allRaises = entries.flatMap(entry => entry.raises || []);
    const avgRaisePercentage = allRaises.length > 0
      ? allRaises.reduce((sum, raise) => sum + raise.percentage, 0) / allRaises.length
      : 0;

    const currentSalary = currentEntries.length > 0
      ? Math.max(...currentEntries.map(entry => entry.salary_max || entry.salary_min))
      : 0;

    return {
      totalEntries: entries.length,
      currentSalary,
      totalRaises,
      avgRaisePercentage: Math.round(avgRaisePercentage * 10) / 10
    };
  };

  const stats = calculateStats();
  const recentEntries = entries.slice(0, 3);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  const statsData = [
    {
      title: "Total Entries",
      value: stats.totalEntries.toString(),
      icon: BarChart3,
      className: "stat-card-blue"
    },
    {
      title: "Current Salary",
      value: stats.currentSalary > 0
        ? formatCurrency(stats.currentSalary, entries.find(e => !e.end_time)?.currency || 'USD')
        : 'N/A',
      icon: DollarSign,
      className: "stat-card-green"
    },
    {
      title: "Total Raises",
      value: stats.totalRaises.toString(),
      icon: TrendingUp,
      className: "stat-card-orange"
    },
    {
      title: "Avg Raise",
      value: `${stats.avgRaisePercentage}%`,
      icon: Percent,
      className: "stat-card-purple"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Overview of your salary entries and career progress</p>
        </div>
        <Link href="/panel/salary-entries/new">
          <Button className="bg-violet-600 hover:bg-violet-700 text-white">
            <Plus className="h-4 w-4 mr-2" />
            Add Entry
          </Button>
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className={`${stat.className} text-white border-0`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm font-medium mb-2">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <Icon className="h-8 w-8 text-white/80" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="border-b border-slate-200 pb-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-slate-900">Recent Entries</CardTitle>
            <Link href="/panel/salary-entries">
              <Button variant="ghost" size="sm" className="text-violet-600 hover:text-violet-700">
                <Eye className="h-4 w-4 mr-2" />
                View All
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {recentEntries.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No salary entries yet</h3>
              <p className="text-slate-600 mb-6">Start tracking your career progress by adding your first salary entry</p>
              <Link href="/panel/salary-entries/new">
                <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Entry
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentEntries.map((entry) => (
                <div key={entry.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">
                      {entry.position} - {entry.level}
                    </h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="secondary" className="bg-violet-100 text-violet-800">
                        {entry.company}
                      </Badge>
                      <span className="text-slate-400">•</span>
                      <span className="text-sm text-slate-600">{entry.city}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-green-600">
                      {formatCurrency(entry.salary_min, entry.currency)}
                    </p>
                    <Badge className={entry.end_time ? "status-past" : "status-current"}>
                      {entry.end_time ? 'Past' : 'Current'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}