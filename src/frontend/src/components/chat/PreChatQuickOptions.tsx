import { Button } from '@/components/ui/button';
import { BookOpen, Lightbulb, Search, MessageSquare } from 'lucide-react';

interface PreChatQuickOptionsProps {
  onSelect: (prompt: string) => void;
}

const options = [
  {
    label: 'Study',
    icon: BookOpen,
    prompt: 'Help me study and understand the key concepts from my knowledge base.',
  },
  {
    label: 'Knowledge',
    icon: Lightbulb,
    prompt: 'What knowledge do I have available in my knowledge base?',
  },
  {
    label: 'Research',
    icon: Search,
    prompt: 'Help me research and find detailed information on a specific topic.',
  },
  {
    label: 'Other',
    icon: MessageSquare,
    prompt: 'I have a question about something in my knowledge base.',
  },
];

export default function PreChatQuickOptions({ onSelect }: PreChatQuickOptionsProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-6">
      <p className="text-sm text-muted-foreground font-medium">Quick start options</p>
      <div className="flex flex-wrap gap-3 justify-center max-w-2xl">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <Button
              key={option.label}
              variant="outline"
              onClick={() => onSelect(option.prompt)}
              className="flex items-center gap-2 px-4 py-6 border-2 hover:border-primary hover:bg-primary/5 hover:shadow-glow transition-all"
            >
              <Icon className="h-4 w-4" />
              <span className="font-medium">{option.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
