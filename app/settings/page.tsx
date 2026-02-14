'use client';

import { useAuthStore } from '@/store/authStore';
import { Card } from '@/components/ui/Card';
import { User as UserIcon, Mail, Shield, Bell } from 'lucide-react';

export default function SettingsPage() {
  const { user } = useAuthStore();

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const displayEmail = user?.email || '';

  const sections = [
    {
      icon: UserIcon,
      title: 'โปรไฟล์',
      description: 'จัดการชื่อ รูปโปรไฟล์ และข้อมูลส่วนตัว',
    },
    {
      icon: Shield,
      title: 'ความปลอดภัย',
      description: 'เปลี่ยนรหัสผ่าน และตั้งค่าการยืนยันตัวตน',
    },
    {
      icon: Bell,
      title: 'การแจ้งเตือน',
      description: 'ตั้งค่าการแจ้งเตือนอีเมลและการแจ้งเตือนในแอป',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto max-w-2xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-text-main">Settings</h1>

        {/* Profile Header */}
        <Card className="mb-6 p-6 hover:translate-y-0 hover:shadow-soft border border-slate-200">
          <div className="flex items-center space-x-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <UserIcon size={32} />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-main">{displayName}</h2>
              <p className="flex items-center gap-1.5 text-sm text-slate-500">
                <Mail size={14} />
                {displayEmail}
              </p>
            </div>
          </div>
        </Card>

        {/* Settings Sections */}
        <div className="space-y-3">
          {sections.map((section) => (
            <Card
              key={section.title}
              className="p-5 hover:translate-y-0 hover:shadow-soft border border-slate-200 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                  <section.icon size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-text-main">{section.title}</h3>
                  <p className="text-xs text-slate-500">{section.description}</p>
                </div>
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Card>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          เร็ว ๆ นี้ — ฟีเจอร์การตั้งค่าเพิ่มเติมกำลังพัฒนา
        </p>
      </div>
    </div>
  );
}
