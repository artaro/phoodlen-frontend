'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type ResetPasswordFormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const [loading, setLoading] = useState(true);

  const passwordValue = watch('password');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    // Supabase sends recovery tokens as hash fragments.
    // The JS client automatically picks them up and establishes a session.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'PASSWORD_RECOVERY' && session) {
          setSessionReady(true);
          setLoading(false);
        } else if (event === 'SIGNED_IN' && session) {
          // Also handle if session is restored
          setSessionReady(true);
          setLoading(false);
        }
      }
    );

    // Fallback: check if a session already exists after a short delay
    const timeout = setTimeout(async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setSessionReady(true);
      }
      setLoading(false);
    }, 2000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess(true);
        setTimeout(() => router.push('/login'), 3000);
      }
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่');
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
        <Card className="w-full max-w-md p-8 border border-slate-200 hover:translate-y-0 hover:shadow-soft">
          <div className="flex flex-col items-center gap-4">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-primary"></div>
            <p className="text-sm text-slate-500">กำลังตรวจสอบ...</p>
          </div>
        </Card>
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-12">
        <Card className="w-full max-w-md p-8 border border-slate-200 hover:translate-y-0 hover:shadow-soft">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-text-main mb-2">ลิงก์ไม่ถูกต้องหรือหมดอายุ</h2>
            <p className="text-slate-500 text-sm mb-6">กรุณาขอลิงก์รีเซ็ตรหัสผ่านใหม่</p>
            <Link href="/forgot-password">
              <Button className="w-full">ขอลิงก์ใหม่</Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-12">
        <Card className="w-full max-w-md p-8 border border-slate-200 hover:translate-y-0 hover:shadow-soft">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-text-main mb-2">เปลี่ยนรหัสผ่านสำเร็จ!</h2>
            <p className="text-slate-500 text-sm mb-6">กำลังพาคุณไปหน้าเข้าสู่ระบบ...</p>
            <Link href="/login">
              <Button className="w-full">ไปหน้าเข้าสู่ระบบ</Button>
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
            ตั้งรหัสผ่านใหม่
          </h2>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-500">{error}</div>}

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-text-main">
                รหัสผ่านใหม่ <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  {...register('password', {
                    required: 'กรุณากรอกรหัสผ่าน',
                    minLength: {
                      value: 6,
                      message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  className={`block w-full rounded-xl border bg-white p-3 pr-11 text-text-main outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-300'}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-text-main">
                ยืนยันรหัสผ่านใหม่ <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  {...register('confirmPassword', {
                    required: 'กรุณายืนยันรหัสผ่าน',
                    validate: (value) =>
                      value === passwordValue || 'รหัสผ่านไม่ตรงกัน',
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`block w-full rounded-xl border bg-white p-3 pr-11 text-text-main outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.confirmPassword ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-300'}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full text-base"
            size="lg"
          >
            บันทึกรหัสผ่านใหม่
          </Button>
        </form>
      </Card>
    </div>
  );
}
