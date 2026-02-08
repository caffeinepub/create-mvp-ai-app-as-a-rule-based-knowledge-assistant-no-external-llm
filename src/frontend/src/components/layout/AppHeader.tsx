import { Button } from '@/components/ui/button';
import { MessageSquare, BookOpen } from 'lucide-react';
import LoginButton from '../auth/LoginButton';
import { useGetCallerUserProfile } from '../../hooks/useCurrentUserProfile';

interface AppHeaderProps {
  currentView: 'chat' | 'knowledge';
  onViewChange: (view: 'chat' | 'knowledge') => void;
}

export default function AppHeader({ currentView, onViewChange }: AppHeaderProps) {
  const { data: userProfile } = useGetCallerUserProfile();

  return (
    <header className="border-b-2 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/assets/generated/ai-mark.dim_512x512.png"
                  alt="UNKNOWN CRIC"
                  className="h-12 w-12 rounded-xl shadow-glow"
                />
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-gradient-to-br from-accent to-secondary rounded-full animate-pulse-glow" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                  UNKNOWN CRIC
                </h1>
                <p className="text-xs font-medium text-muted-foreground">Knowledge-powered assistant</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2 ml-8">
              <Button
                variant={currentView === 'chat' ? 'default' : 'ghost'}
                onClick={() => onViewChange('chat')}
                className="gap-2 transition-all hover:shadow-glow"
              >
                <MessageSquare className="h-4 w-4" />
                Chat
              </Button>
              <Button
                variant={currentView === 'knowledge' ? 'default' : 'ghost'}
                onClick={() => onViewChange('knowledge')}
                className="gap-2 transition-all hover:shadow-glow"
              >
                <BookOpen className="h-4 w-4" />
                Knowledge Base
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {userProfile && (
              <div className="hidden sm:block text-sm">
                <span className="text-muted-foreground">Welcome, </span>
                <span className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {userProfile.name}
                </span>
              </div>
            )}
            <LoginButton />
          </div>
        </div>

        <nav className="flex md:hidden items-center gap-2 mt-4">
          <Button
            variant={currentView === 'chat' ? 'default' : 'ghost'}
            onClick={() => onViewChange('chat')}
            className="flex-1 gap-2 transition-all"
          >
            <MessageSquare className="h-4 w-4" />
            Chat
          </Button>
          <Button
            variant={currentView === 'knowledge' ? 'default' : 'ghost'}
            onClick={() => onViewChange('knowledge')}
            className="flex-1 gap-2 transition-all"
          >
            <BookOpen className="h-4 w-4" />
            Knowledge Base
          </Button>
        </nav>
      </div>
    </header>
  );
}
