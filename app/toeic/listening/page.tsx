import { Headphones } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ListeningPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-primary">
          <Headphones size={24} />
        </div>
        <h1 className="text-3xl font-bold text-text-main">การฟัง (Listening)</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for Parts */}
        {['Part 1: Photographs', 'Part 2: Question-Response', 'Part 3: Conversations', 'Part 4: Talks'].map((part, index) => (
          <Card key={index} className="p-6">
            <h2 className="mb-2 text-xl font-semibold text-text-main">{part}</h2>
            <p className="mb-6 text-slate-600">ฝึกฝนข้อสอบ {part} พร้อมเฉลยละเอียด</p>
            <Button variant="primary" className="w-full">
              เริ่มฝึก
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
