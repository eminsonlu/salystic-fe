import { notFound } from 'next/navigation';
import EditSalaryEntryContainer from '@/containers/panel/EditSalaryEntryContainer';

interface EditSalaryEntryPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditSalaryEntryPage({ params }: EditSalaryEntryPageProps) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  return <EditSalaryEntryContainer entryId={id} />;
}