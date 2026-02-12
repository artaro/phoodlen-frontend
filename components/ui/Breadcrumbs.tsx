'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';

// Map route segments to friendly Thai names
const routeNameMap: Record<string, string> = {
  'toeic': 'TOEIC',
  'listening': 'Listening',
  'reading': 'Reading',
  'login': 'เข้าสู่ระบบ',
  'register': 'ลงทะเบียน',
};

export function Breadcrumbs({ className }: { className?: string }) {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={cn("flex items-center text-sm text-slate-500", className)}>
      <ol className="flex items-center space-x-2">
        {/* Home Link */}
        <li>
          <Link 
            href="/" 
            className="flex items-center hover:text-primary transition-colors"
            title="หน้าหลัก"
          >
            <Home size={16} />
          </Link>
        </li>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join('/')}`;
          const isLast = index === segments.length - 1;
          const name = routeNameMap[segment] || segment;

          return (
            <Fragment key={href}>
              <li>
                <ChevronRight size={14} className="text-slate-400" />
              </li>
              <li>
                {isLast ? (
                  <span className="font-medium text-text-main" aria-current="page">
                    {name}
                  </span>
                ) : (
                  <Link 
                    href={href} 
                    className="hover:text-primary transition-colors"
                  >
                    {name}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
