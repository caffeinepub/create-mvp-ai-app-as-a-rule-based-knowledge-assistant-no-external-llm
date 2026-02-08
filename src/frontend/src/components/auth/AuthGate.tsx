import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Loader2, Sparkles } from 'lucide-react';

export default function AuthGate() {
  const { login, loginStatus } = useInternetIdentity();

  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/20">
      <Card className="w-full max-w-md border-2 shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="/assets/generated/ai-mark.dim_512x512.png"
                alt="AI Assistant"
                className="h-20 w-20 rounded-2xl"
              />
              <div className="absolute -top-1 -right-1 bg-primary rounded-full p-1.5">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl">Welcome to AI Assistant</CardTitle>
            <CardDescription className="mt-2">
              Your personal knowledge-powered chat assistant
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>✨ Build your own knowledge base</p>
            <p>💬 Get instant answers from your data</p>
            <p>🔒 Secure authentication with Internet Identity</p>
          </div>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            size="lg"
            className="w-full"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Connecting...
              </>
            ) : (
              'Sign In to Get Started'
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground">
            By signing in, you agree to use Internet Identity for secure authentication
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
