'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type ForgotPasswordFormData = {
  email: string;
};

export default function ForgotPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const { createClient } = await import('@supabase/supabase-js');
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่');
    }
  };

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md p-8 hover:translate-y-0 hover:shadow-soft border border-slate-200">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
              <svg className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-main mb-2">ตรวจสอบอีเมลของคุณ</h2>
            <p className="text-slate-600 mb-6">เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของคุณแล้ว</p>
            <Link href="/login">
              <Button className="w-full" variant="secondary">กลับไปหน้าเข้าสู่ระบบ</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8 hover:translate-y-0 hover:shadow-soft border border-slate-200">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            พูดเล่น
          </h1>
          <h2 className="mt-2 text-lg text-slate-600">
            ลืมรหัสผ่าน
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            กรอกอีเมลของคุณ เราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านให้
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-500">{error}</div>}

          <div>
            <label className="mb-1 block text-sm font-medium text-text-main">
              อีเมล <span className="text-red-500">*</span>
            </label>
            <input
              {...register('email', {
                required: 'กรุณากรอกอีเมล',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'รูปแบบอีเมลไม่ถูกต้อง',
                },
              })}
              type="email"
              className={`block w-full rounded-xl border bg-white p-3 text-text-main outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-300'}`}
              placeholder="name@example.com"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full text-base"
            size="lg"
          >
            ส่งลิงก์รีเซ็ตรหัสผ่าน
          </Button>

          <div className="text-center text-sm">
            <Link href="/login" className="font-medium text-primary hover:text-indigo-500 transition-colors">
              กลับไปหน้าเข้าสู่ระบบ
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
