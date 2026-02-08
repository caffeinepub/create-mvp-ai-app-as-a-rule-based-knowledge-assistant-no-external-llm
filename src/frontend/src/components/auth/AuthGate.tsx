import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { Loader2, Sparkles, Zap, Shield } from 'lucide-react';

export default function AuthGate() {
  const { login, loginStatus } = useInternetIdentity();

  const isLoggingIn = loginStatus === 'logging-in';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background via-40% to-accent/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(var(--primary)/0.15),transparent_50%),radial-gradient(circle_at_70%_80%,oklch(var(--accent)/0.15),transparent_50%)]" />
      
      <Card className="w-full max-w-md border-2 shadow-glow-lg relative z-10 bg-card/95 backdrop-blur-sm">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl blur-xl opacity-50 animate-pulse-glow" />
              <img
                src="/assets/generated/ai-mark.dim_512x512.png"
                alt="UNKNOWN CRIC"
                className="h-24 w-24 rounded-3xl relative z-10 shadow-glow-lg"
              />
              <div className="absolute -top-2 -right-2 bg-gradient-to-br from-accent to-secondary rounded-full p-2 shadow-accent-glow">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
          <div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Welcome to UNKNOWN CRIC
            </CardTitle>
            <CardDescription className="mt-2 text-base">
              Your personal knowledge-powered chat assistant
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
              <div className="p-2 rounded-lg bg-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Build your knowledge base</p>
                <p className="text-xs text-muted-foreground">Create custom Q&A entries</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20">
              <div className="p-2 rounded-lg bg-accent/20">
                <Zap className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Get instant answers</p>
                <p className="text-xs text-muted-foreground">Chat with your data in real-time</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-secondary/10 to-secondary/5 border border-secondary/20">
              <div className="p-2 rounded-lg bg-secondary/20">
                <Shield className="h-4 w-4 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Secure authentication</p>
                <p className="text-xs text-muted-foreground">Protected by Internet Identity</p>
              </div>
            </div>
          </div>
          <Button
            onClick={login}
            disabled={isLoggingIn}
            size="lg"
            className="w-full shadow-glow hover:shadow-glow-lg transition-all"
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
