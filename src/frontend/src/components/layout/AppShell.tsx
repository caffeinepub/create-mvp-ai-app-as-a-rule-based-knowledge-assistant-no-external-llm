import { type ReactNode } from 'react';
import AppHeader from './AppHeader';

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
      <footer className="border-t py-6 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          © 2026. Built with love using{' '}
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium hover:text-foreground transition-colors underline underline-offset-4"
          >
            caffeine.ai
          </a>
        </div>
      </footer>
    </div>
  );
}
