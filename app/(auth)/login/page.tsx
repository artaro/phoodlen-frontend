'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

type LoginFormData = {
  email: string;
  password: string;
};

export default function Login() {
  const router = useRouter();
  const { signInWithEmail } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: LoginFormData) => {
    const result = await signInWithEmail(data.email, data.password);
    if (result.error) {
      setError(result.error);
    } else {
      router.push('/');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md p-8 hover:translate-y-0 hover:shadow-soft border border-slate-200">
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
              <label className="mb-1 block text-sm font-medium text-text-main">
                อีเมล <span className="text-red-500">*</span>
              </label>
              <input
                {...register('email', { 
                  required: 'กรุณากรอกอีเมล',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "รูปแบบอีเมลไม่ถูกต้อง"
                  }
                })}
                type="email"
                className={`block w-full rounded-xl border bg-white p-3 text-text-main outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : 'border-slate-300'}`}
                placeholder="name@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>
            
            <div>
              <label className="mb-1 block text-sm font-medium text-text-main">
                รหัสผ่าน <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  {...register('password', { required: 'กรุณากรอกรหัสผ่าน' })}
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
          </div>

          <div className="flex justify-end">
            <Link href="/forgot-password" className="text-sm text-primary hover:text-indigo-500 transition-colors">
              ลืมรหัสผ่าน?
            </Link>
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
