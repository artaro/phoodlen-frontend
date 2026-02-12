'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const [error, setError] = useState('');

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await api.post('/auth/login', data);
      setAuth(response.data.user, response.data.token);
      router.push('/');
    } catch (err: unknown) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data?.error || 'Login failed');
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
                className={`block w-full rounded-xl border-slate-200 bg-slate-50 p-3 text-text-main focus:border-primary focus:ring-primary ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="name@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-text-main">รหัสผ่าน</label>
              <input
                {...register('password', { required: 'กรุณากรอกรหัสผ่าน' })}
                type="password"
                className={`block w-full rounded-xl border-slate-200 bg-slate-50 p-3 text-text-main focus:border-primary focus:ring-primary ${errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
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
