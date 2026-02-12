'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const { signInWithEmail, signInWithOAuth } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const [error, setError] = useState('');

  const onSubmit = async (data: LoginFormData) => {
    const result = await signInWithEmail(data.email, data.password);
    if (result.error) {
      setError(result.error);
    } else {
      router.push('/');
    }
  };

  const handleOAuth = async (provider: 'google' | 'facebook') => {
    const result = await signInWithOAuth(provider);
    if (result.error) {
      setError(result.error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8 hover:translate-y-0 hover:shadow-soft border border-slate-100">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            พูดเล่น
          </h1>
          <h2 className="mt-2 text-lg text-slate-600">
            เข้าสู่ระบบเพื่อเริ่มเรียนรู้
          </h2>
        </div>
        
        {/* OAuth Buttons */}
        <div className="mb-6 space-y-3">
          <button
            type="button"
            onClick={() => handleOAuth('google')}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md active:scale-[0.98] cursor-pointer"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            เข้าสู่ระบบด้วย Google
          </button>
          
          <button
            type="button"
            onClick={() => handleOAuth('facebook')}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#1877F2] px-4 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#166FE5] hover:shadow-md active:scale-[0.98] cursor-pointer"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            เข้าสู่ระบบด้วย Facebook
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-4 text-slate-400">หรือ</span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {error && <div className="rounded-lg bg-red-50 p-3 text-center text-sm text-red-500">{error}</div>}
          
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-text-main">อีเมล</label>
              <input
                {...register('email', { 
                  required: 'กรุณากรอกอีเมล',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "รูปแบบอีเมลไม่ถูกต้อง"
                  }
                })}
                type="email"
                className={`block w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-text-main focus:border-primary focus:ring-primary ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="name@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-text-main">รหัสผ่าน</label>
              <input
                {...register('password', { required: 'กรุณากรอกรหัสผ่าน' })}
                type="password"
                className={`block w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-text-main focus:border-primary focus:ring-primary ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="••••••••"
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isSubmitting}
            className="w-full text-base"
            size="lg"
          >
            เข้าสู่ระบบ
          </Button>

          <div className="text-center text-sm">
            <Link href="/register" className="font-medium text-primary hover:text-indigo-500 transition-colors">
              ยังไม่มีบัญชี? สมัครสมาชิก
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
