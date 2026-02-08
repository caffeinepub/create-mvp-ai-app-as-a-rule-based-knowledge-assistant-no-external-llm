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
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <img
                src="/assets/generated/ai-mark.dim_512x512.png"
                alt="AI Assistant"
                className="h-10 w-10 rounded-lg"
              />
              <div>
                <h1 className="text-xl font-bold tracking-tight">AI Assistant</h1>
                <p className="text-xs text-muted-foreground">Knowledge-powered chat</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-2 ml-8">
              <Button
                variant={currentView === 'chat' ? 'default' : 'ghost'}
                onClick={() => onViewChange('chat')}
                className="gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Chat
              </Button>
              <Button
                variant={currentView === 'knowledge' ? 'default' : 'ghost'}
                onClick={() => onViewChange('knowledge')}
                className="gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Knowledge Base
              </Button>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {userProfile && (
              <div className="hidden sm:block text-sm text-muted-foreground">
                Welcome, <span className="font-medium text-foreground">{userProfile.name}</span>
              </div>
            )}
            <LoginButton />
          </div>
        </div>

        <nav className="flex md:hidden items-center gap-2 mt-4">
          <Button
            variant={currentView === 'chat' ? 'default' : 'ghost'}
            onClick={() => onViewChange('chat')}
            className="flex-1 gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Chat
          </Button>
          <Button
            variant={currentView === 'knowledge' ? 'default' : 'ghost'}
            onClick={() => onViewChange('knowledge')}
            className="flex-1 gap-2"
          >
            <BookOpen className="h-4 w-4" />
            Knowledge Base
          </Button>
        </nav>
      </div>
    </header>
  );
}
