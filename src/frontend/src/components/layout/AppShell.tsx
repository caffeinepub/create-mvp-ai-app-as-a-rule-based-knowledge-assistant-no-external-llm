import { type ReactNode } from 'react';
import AppHeader from './AppHeader';
import { Heart } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  currentView: 'chat' | 'knowledge';
  onViewChange: (view: 'chat' | 'knowledge') => void;
}

export default function AppShell({ children, currentView, onViewChange }: AppShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <AppHeader currentView={currentView} onViewChange={onViewChange} />
      <main className="flex-1 flex flex-col">
        {children}
      </main>
      <footer className="border-t-2 py-6 px-4 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          © 2026. Built with{' '}
          <Heart className="inline h-4 w-4 text-destructive fill-destructive mx-1" />
          using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:from-accent hover:to-secondary transition-all underline underline-offset-4"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
