import Link from 'next/link';
import { ArrowRight, BookOpen, Headphones } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export default function ToeicDashboard() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] justify-center bg-bg-main">
      <section className="px-4 py-12 text-center sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <h1 className="mb-6 text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
            เลือกทักษะที่ต้องการฝึกฝน
          </h1>
          <p className="mb-10 text-lg text-slate-600">
            เตรียมพร้อมสอบ TOEIC ให้ได้คะแนนตามเป้าหมาย
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Listening Banner */}
          <Link href="/toeic/listening" className="block h-full">
            <Card className="group relative h-full overflow-hidden border-0 bg-gradient-to-br from-primary to-indigo-600 p-8 text-white shadow-soft transition-all duration-300 hover:scale-[1.02] hover:shadow-active">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="mb-2 text-3xl font-bold">ข้อสอบ Listening</h2>
                  <p className="max-w-[80%] text-white/90 mb-6">
                    ฝึกการฟัง Part 1-4: Photographs, Question-Response, Conversations, Talks
                  </p>
                  <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors group-hover:bg-white/30">
                    เริ่มฝึกฝน
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
                <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                  <Headphones size={48} />
                </div>
              </div>
            </Card>
          </Link>

          {/* Reading Banner */}
          <Link href="/toeic/reading" className="block h-full">
            <Card className="group relative h-full overflow-hidden border-0 bg-gradient-to-br from-secondary to-teal-600 p-8 text-white shadow-soft transition-all duration-300 hover:scale-[1.02] hover:shadow-active">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="mb-2 text-3xl font-bold">ข้อสอบ Reading</h2>
                  <p className="max-w-[80%] text-white/90 mb-6">
                    ฝึกการอ่าน Part 5-7: Incomplete Sentences, Text Completion, Reading Comprehension
                  </p>
                  <div className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-colors group-hover:bg-white/30">
                    เริ่มฝึกฝน
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
                <div className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                  <BookOpen size={48} />
                </div>
              </div>
            </Card>
          </Link>
        </div>
      </section>
    </div>
  );
}
