import Link from 'next/link';
import { ArrowRight, MessageCircle, Trophy, Briefcase, Bell } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TypewriterEffect } from '@/components/ui/TypewriterEffect';

export default function Home() {
  const headlines = [
    { highlight: "อัปคะแนนจริง", rest: " ด้วยวิธีเรียนที่เหมือนเล่น" },
    { highlight: "พูดเล่นๆ", rest: " จนเก่งจริง" },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-bg-main">
      {/* Brand Hero Section */}
      <section className="flex flex-grow flex-col justify-center px-4 pt-20 pb-10 text-center sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="mb-6 h-28 sm:h-36 md:h-44 text-5xl font-bold tracking-tight text-text-main sm:text-6xl md:text-7xl flex items-center justify-center">
            <TypewriterEffect phrases={headlines} />
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-slate-600 sm:text-2xl">
            แพลตฟอร์มภาษาอังกฤษที่เปลี่ยนเรื่องยากให้เป็นเรื่องง่าย เริ่มต้นด้วย TOEIC เพื่อโอกาสการทำงาน แล้วสานต่อสู่การพูดที่มั่นใจ
          </p>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <Link href="/toeic">
              <Button size="lg" className="h-16 px-8 text-xl shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer">
                เริ่มเช็กเลเวล TOEIC ของคุณ
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
            </Link>
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              ✨ First Step for Career
            </span>
          </div>
        </div>
      </section>

      {/* Feature Showcase Section */}
      {/* Learning Path Roadmap Section */}
      {/* Learning Path Roadmap Section */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-main sm:text-4xl mb-4">
              Learning Roadmap
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              เส้นทางสู่ความสำเร็จเริ่มจากการวัดระดับ แล้วพัฒนาทักษะการพูด จนถึงการใช้ในงานจริง
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
            {/* Step 1: Get Certified */}
            <Link href="/toeic" className="block group h-full">
              <Card className="h-full border border-indigo-100 bg-white shadow-soft hover:shadow-active hover:border-indigo-300 relative overflow-hidden transition-all hover:-translate-y-1">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500/20 group-hover:bg-indigo-500 transition-colors"></div>
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-600">
                      <Trophy className="h-8 w-8" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-100 text-indigo-700">
                      Step 1
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text-main mb-2">Get Certified</h3>
                  <p className="text-slate-600 text-sm mb-6 flex-grow">
                    อัปคะแนน TOEIC ให้โปรไฟล์ปัง ด้วยคลังข้อสอบจริงและการวิเคราะห์จุดอ่อน
                  </p>
                  <div className="flex items-center text-primary font-bold text-sm bg-primary/5 p-3 rounded-lg justify-center group-hover:bg-primary group-hover:text-white transition-colors border border-primary/20">
                    เริ่มทดสอบเลย <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Card>
            </Link>

            {/* Step 2: Get Talking */}
            <Card className="h-full border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
               <div className="p-6 flex flex-col h-full">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-200 text-slate-500">
                      <MessageCircle className="h-8 w-8" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-600">
                      Step 2
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-600 mb-2">Get Talking</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-grow">
                    ฝึกพูดให้คล่องเหมือนเจ้าของภาษา กับ AI คู่ซ้อมที่พร้อมคุยกับคุณ 24 ชม.
                  </p>
                  <Button variant="ghost" className="w-full border-2 border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-400 hover:bg-transparent cursor-pointer">
                    <Bell className="mr-2 h-4 w-4" /> แจ้งเตือนเมื่อเปิดใช้
                  </Button>
                </div>
            </Card>

            {/* Step 3: Get Working */}
            <Card className="h-full border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
               <div className="p-6 flex flex-col h-full">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-slate-200 text-slate-500">
                      <Briefcase className="h-8 w-8" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-200 text-slate-600">
                      Step 3
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-600 mb-2">Get Working</h3>
                  <p className="text-slate-500 text-sm mb-6 flex-grow">
                    สื่อสารในที่ทำงานอย่างมั่นใจ ด้วยคอร์ส Business English ระดับมืออาชีพ
                  </p>
                  <Button variant="ghost" className="w-full border-2 border-slate-200 text-slate-500 hover:text-slate-700 hover:border-slate-400 hover:bg-transparent cursor-pointer">
                    <Bell className="mr-2 h-4 w-4" /> แจ้งเตือนเมื่อเปิดใช้
                  </Button>
                </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
