import { cn } from '@/lib/utils';
import type { Time } from '../../backend';

interface ChatMessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp: Time;
}

export default function ChatMessageBubble({ message, isUser, timestamp }: ChatMessageBubbleProps) {
  const date = new Date(Number(timestamp) / 1_000_000);
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div className={cn('max-w-[80%] space-y-1', isUser ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3 shadow-md transition-all hover:shadow-lg',
            isUser
              ? 'bg-gradient-to-br from-primary via-primary to-accent text-primary-foreground rounded-br-sm border-2 border-primary/20 shadow-glow'
              : 'bg-gradient-to-br from-card via-card to-secondary/10 border-2 border-border rounded-bl-sm hover:border-accent/50'
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message}</p>
        </div>
        <p className={cn('text-xs text-muted-foreground px-2 font-medium', isUser ? 'text-right' : 'text-left')}>
          {timeString}
        </p>
      </div>
    </div>
  );
}
