import { useState } from 'react';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useCurrentUserProfile';
import AuthGate from './components/auth/AuthGate';
import ProfileSetupDialog from './components/auth/ProfileSetupDialog';
import AppShell from './components/layout/AppShell';
import ChatPage from './pages/ChatPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

type View = 'chat' | 'knowledge';

export default function App() {
  const { identity } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [currentView, setCurrentView] = useState<View>('chat');

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  if (!isAuthenticated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthGate />
        <Toaster />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AppShell currentView={currentView} onViewChange={setCurrentView}>
        {currentView === 'chat' ? <ChatPage /> : <KnowledgeBasePage />}
      </AppShell>
      {showProfileSetup && <ProfileSetupDialog />}
      <Toaster />
    </ThemeProvider>
  );
}
