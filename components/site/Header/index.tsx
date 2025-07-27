'use client';

import { useState, useEffect, useCallback } from 'react';
import { logout, getCurrentUser } from '@/services/auth';
import { IUser } from '@/types/IUser';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = useCallback(async () => {
    try {
      const [error, user] = await getCurrentUser();

      if (error) {
        console.error('Failed to fetch user profile:', error);
        setIsAuthenticated(false);
        setUserProfile(null);
      } else if (user) {
        setIsAuthenticated(true);
        setUserProfile(user);
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleLogin = () => {
    setIsLoading(true);
    const backendUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${backendUrl}/auth/linkedin`;
  };

  const handleLogout = async () => {
    try {
      const [error] = await logout();
      if (!error) {
        document.cookie = 'token=; path=/; max-age=0';
        setIsAuthenticated(false);
        setUserProfile(null);
      }
    } catch (error) {
      console.error('Failed to logout:', error);
      document.cookie = 'token=; path=/; max-age=0';
      setIsAuthenticated(false);
      setUserProfile(null);
    }
  };

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="Salystic Logo"
                width={40}
                height={40}
              />
              <span className="ml-2 text-xl font-medium text-gray-400">
                Salystic
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {userProfile && (
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-700 text-sm">Welcome back!</span>
                  </div>
                )}
                <Link
                  href="/panel"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="h-10 aspect-[430/80] relative cursor-pointer group"
              >
                <Image
                  loader={({ src }) => src}
                  src="/Sign-In-Large---Default.png"
                  alt="LinkedIn Login"
                  fill
                  className="object-contain group-hover:hidden"
                />
                <Image
                  loader={({ src }) => src}
                  src="/Sign-In-Large---Hover.png"
                  alt="LinkedIn Login"
                  fill
                  className="object-contain group-hover:block hidden"
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
