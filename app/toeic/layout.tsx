import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export default function ToeicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <Breadcrumbs />
      </div>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
