import { BookOpen } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ReadingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 rounded-3xl bg-teal-50/50 border border-teal-100 p-8 flex items-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-secondary shadow-sm ring-1 ring-teal-100">
          <BookOpen size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-text-main mb-1">การอ่าน (Reading)</h1>
          <p className="text-slate-500">รวมเทคนิคและแบบฝึกหัด Part 5-7 ครบจบในที่เดียว</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder for Parts */}
        {['Part 5: Incomplete Sentences', 'Part 6: Text Completion', 'Part 7: Reading Comprehension'].map((part, index) => (
          <Card key={index} className="p-6">
            <h2 className="mb-2 text-xl font-semibold text-text-main">{part}</h2>
            <p className="mb-6 text-slate-600">ฝึกฝนข้อสอบ {part} พร้อมเทคนิคการอ่าน</p>
            <Button variant="secondary" className="w-full border-secondary text-secondary hover:bg-secondary/10">
              เริ่มฝึก
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
