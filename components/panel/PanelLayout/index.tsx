'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import {
  LayoutDashboard,
  DollarSign,
  Plus,
  LogOut,
  Menu,
} from 'lucide-react';
import Button from '@/components/shared/Button';
import { logout } from '@/services/auth';
import { cn } from '@/lib/utils';

interface PanelLayoutProps {
  children: React.ReactNode;
}

export default function PanelLayout({ children }: PanelLayoutProps) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      const [error] = await logout();
      if (!error) {
        document.cookie = 'token=; path=/; max-age=0';
        window.location.href = '/';
      }
    } catch (error) {
      console.error('Failed to logout:', error);
      document.cookie = 'token=; path=/; max-age=0';
      window.location.href = '/';
    } finally {
      setIsLoading(false);
    }
  };

  const navigationItems = [
    { name: 'Dashboard', href: '/panel', icon: LayoutDashboard },
    { name: 'Salary Entries', href: '/panel/salary-entries', icon: DollarSign },
    { name: 'Add Entry', href: '/panel/salary-entries/new', icon: Plus },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="flex items-center px-6 py-8">
            <Image
              src="/logo.png"
              alt="Salystic"
              width={40}
              height={40}
              className="mr-3"
            />
            <span className="text-xl font-bold text-white">
              Salystic
            </span>
          </div>

          <nav className="flex-1 px-4 pb-4">
            <div className="space-y-1">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "sidebar-item flex items-center text-sm font-medium",
                      isActive ? "bg-white" : "text-slate-300 hover:text-white"
                    )}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </nav>

          <div className="p-4 border-t border-slate-800">
            <Button
              onClick={handleLogout}
              disabled={isLoading}
              variant="ghost"
              className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4 mr-3" />
              {isLoading ? 'Logging out...' : 'Logout'}
            </Button>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-4"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-violet-500 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-white">usr</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}