import { Headphones } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ListeningPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-3xl bg-indigo-50/50 border border-indigo-100 p-8 flex items-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm ring-1 ring-indigo-100">
          <Headphones size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">การฟัง (Listening)</h1>
          <p className="text-slate-500">ฝึกหูให้เทพกับข้อสอบ Part 1-4 สำเนียงเป๊ะเหมือนสอบจริง</p>
        </div>
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
