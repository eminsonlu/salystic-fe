import AuthCallbackContainer from '@/containers/site/AuthCallbackContainer';

interface AuthCallbackPageProps {
  searchParams: Promise<{
    success?: string;
    token?: string;
    expires_in?: string;
    error?: string;
    error_description?: string;
  }>;
}

export default async function AuthCallbackPage({ searchParams }: AuthCallbackPageProps) {
  const { success, token, expires_in, error, error_description } = await searchParams;

  if (error) {
    const errorMessage = `Authentication failed: ${error}${error_description ? ` - ${error_description}` : ''}`;
    return <AuthCallbackContainer status="error" message={errorMessage} />;
  }

  if (success === 'true' && token) {
    return (
      <AuthCallbackContainer
        status="success"
        message="Authentication successful! Redirecting..."
        token={token}
        expiresIn={expires_in ? parseInt(expires_in) : undefined}
      />
    );
  }

  return <AuthCallbackContainer status="error" message="Invalid authentication response" />;
}
