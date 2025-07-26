'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthCallbackContainerProps {
  status: 'loading' | 'success' | 'error';
  message: string;
  token?: string;
  expiresIn?: number;
}

export default function AuthCallbackContainer({
  status,
  message,
  token,
  expiresIn
}: AuthCallbackContainerProps) {
  const router = useRouter();

  useEffect(() => {
    if (status === 'success' && token) {
      const maxAge = expiresIn || 86400;
      document.cookie = `token=${token}; path=/; max-age=${maxAge}`;

      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [status, token, expiresIn, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {status === 'loading' && 'Processing authentication...'}
            {status === 'success' && 'Authentication successful!'}
            {status === 'error' && 'Authentication failed'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {message}
          </p>

          {status === 'loading' && (
            <div className="mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          )}

          {status === 'error' && (
            <div className="mt-4">
              <button
                onClick={() => router.push('/')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Go back to home
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}