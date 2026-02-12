'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { 
  LogOut, 
  Settings, 
  User as UserIcon, 
  Moon,
  ChevronDown
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const { user, signOut } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Don't show navbar on login/register pages
  if (['/login', '/register'].includes(pathname)) return null;

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const displayEmail = user?.email || '';

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-primary">
              พูดเล่น
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {user ? (
              <>
                <div className="flex items-center space-x-3 rounded-full bg-gray-100 px-3 py-1.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <UserIcon size={18} />
                  </div>
                  <span className="max-w-[100px] truncate text-sm font-medium text-gray-700">
                    {displayName}
                  </span>
                </div>
                
                <button 
                  className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  aria-label="Settings"
                >
                  <Settings size={20} />
                </button>

                <button
                  onClick={handleLogout}
                  className="rounded-full p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all shadow-sm active:scale-95"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button - Profile Trigger */}
          <div className="flex md:hidden relative" ref={menuRef}>
            {user ? (
              <>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center space-x-2 rounded-full border border-gray-200 bg-white px-2 py-1.5 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    <UserIcon size={16} />
                  </div>
                  <span className="max-w-[80px] truncate text-sm font-medium text-gray-700">
                    {displayName}
                  </span>
                  <ChevronDown size={14} className={cn("text-gray-400 transition-transform", isMenuOpen && "rotate-180")} />
                </button>

                {/* Mobile Popover Menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 origin-top-right rounded-xl border border-gray-100 bg-white p-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* Header */}
                    <div className="mb-2 border-b border-gray-100 px-3 pb-3 pt-2">
                       <div className="flex flex-col items-center justify-center text-center">
                         <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
                            <UserIcon size={32} />
                         </div>
                         <p className="font-semibold text-gray-900">{displayName}</p>
                         <p className="text-xs text-gray-500">{displayEmail}</p>
                       </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="space-y-1">
                      <button 
                        className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Settings size={18} />
                        <span>Settings</span>
                      </button>
                      
                      {/* Theme Toggle Placeholder */}
                      <button 
                         className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                         onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="flex items-center space-x-2">
                          <Moon size={18} />
                          <span>Dark Mode</span>
                        </div>
                         <div className="relative inline-flex h-5 w-9 items-center rounded-full bg-gray-200">
                            <span className="translate-x-1 inline-block h-3 w-3 transform rounded-full bg-white transition"/>
                         </div>
                      </button>

                      <div className="my-1 border-t border-gray-100"></div>

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center space-x-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={18} />
                        <span>Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
               <div className="flex items-center space-x-2">
                   <Link
                      href="/login"
                      className="text-sm font-medium text-gray-700 hover:text-indigo-600"
                    >
                      Sign in
                    </Link>
                    <Link
                      href="/register"
                      className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
                    >
                      Sign up
                    </Link>
               </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
