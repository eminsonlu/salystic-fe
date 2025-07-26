'use client';

import { useState } from 'react';
import { DollarSign, Edit, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shared/Card';
import Button from '@/components/shared/Button';
import Badge from '@/components/shared/Badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shared/Table';
import { ISalaryEntry } from '@/types/ISalary';

interface SalaryEntriesListProps {
  entries: ISalaryEntry[];
  onDelete: (id: string) => void;
  isLoading?: boolean;
}

export default function SalaryEntriesList({ entries, onDelete, isLoading = false }: SalaryEntriesListProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this salary entry?')) {
      setDeletingId(id);
      await onDelete(id);
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-16">
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
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-slate-900">Salary Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="table-header">
              <TableHead className="font-semibold">Position</TableHead>
              <TableHead className="font-semibold">Salary</TableHead>
              <TableHead className="font-semibold">Location</TableHead>
              <TableHead className="font-semibold">Duration</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Raises</TableHead>
              <TableHead className="font-semibold text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id} className="table-row">
                <TableCell>
                  <div>
                    <div className="font-semibold text-slate-900">{entry.position}</div>
                    <div className="text-sm text-slate-600">{entry.level}</div>
                    <Badge variant="secondary" className="mt-1 bg-violet-100 text-violet-800">
                      {entry.company}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-bold text-green-600 text-lg">
                    {entry.salary_max ? `${entry.salary_min} - ${entry.salary_max}` : `${entry.salary_min}+`}
                  </div>
                  <div className="text-sm text-slate-500">
                    {entry.salary_range ? entry.salary_range : `${entry.salary_min}+`}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-slate-900">{entry.city}</span>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="text-slate-900">{formatDate(entry.start_time)}</div>
                    <div className="text-sm text-slate-500">
                      {entry.end_time ? `to ${formatDate(entry.end_time)}` : 'Present'}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={entry.end_time ? "status-past" : "status-current"}>
                    {entry.end_time ? 'Past' : 'Current'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {entry.raises && entry.raises.length > 0 ? (
                    <div className="space-y-1">
                      <div className="text-sm font-medium">{entry.raises.length} raises</div>
                      <div className="flex flex-wrap gap-1">
                        {entry.raises.slice(0, 2).map((raise) => (
                          <Badge key={raise.id} variant="outline" className="text-xs bg-yellow-50 border-yellow-200 text-yellow-800">
                            +{raise.percentage}%
                          </Badge>
                        ))}
                        {entry.raises.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{entry.raises.length - 2} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  ) : (
                    <span className="text-slate-400">No raises</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Link href={`/panel/salary-entries/${entry.id}/edit`}>
                      <Button variant="ghost" size="sm" className="hover:bg-slate-50 hover:text-slate-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href={`/panel/salary-entries/${entry.id}/add-raise`}>
                      <Button variant="ghost" size="sm" className="hover:bg-green-50 hover:text-green-600">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(entry.id)}
                      disabled={deletingId === entry.id}
                      className="hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                    >
                      {deletingId === entry.id ? (
                        <div className="h-4 w-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}