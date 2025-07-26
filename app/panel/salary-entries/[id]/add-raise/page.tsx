import { notFound } from 'next/navigation';
import AddRaiseContainer from '@/containers/panel/AddRaiseContainer';

interface AddRaisePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AddRaisePage({ params }: AddRaisePageProps) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  return <AddRaiseContainer entryId={id} />;
}