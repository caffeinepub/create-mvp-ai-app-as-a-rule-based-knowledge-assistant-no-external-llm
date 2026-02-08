import { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader2, Sparkles } from 'lucide-react';
import { useChatHistory, useSendMessage } from '../hooks/useChat';
import ChatMessageBubble from '../components/chat/ChatMessageBubble';
import PreChatQuickOptions from '../components/chat/PreChatQuickOptions';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function ChatPage() {
  const [input, setInput] = useState('');
  const { data: messages = [], isLoading } = useChatHistory();
  const sendMessage = useSendMessage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { identity } = useInternetIdentity();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || sendMessage.isPending) return;

    const userMessage = input.trim();
    setInput('');
    
    await sendMessage.mutateAsync(userMessage);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleOptionSelect = (prompt: string) => {
    setInput(prompt);
    // Focus the textarea after setting the input
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
          Chat Assistant
        </h1>
        <p className="text-muted-foreground mt-1">
          Ask questions based on your knowledge base
        </p>
      </div>

      <Card className="flex-1 flex flex-col overflow-hidden border-2 shadow-glow bg-gradient-to-br from-card via-card to-primary/5">
        <ScrollArea className="flex-1 p-6" ref={scrollRef}>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                <p className="text-sm text-muted-foreground">Loading messages...</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-center">
              <div className="max-w-md space-y-4">
                <div className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 shadow-glow">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-2">Start a conversation</p>
                  <p className="text-muted-foreground text-sm">
                    Ask me anything! I'll search your knowledge base to find the best answer.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => (
                <ChatMessageBubble
                  key={msg.id.toString()}
                  message={msg.message}
                  isUser={msg.sender.toString() === identity?.getPrincipal().toString()}
                  timestamp={msg.timestamp}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-4 border-t-2 bg-gradient-to-r from-muted/50 via-accent/5 to-primary/5 backdrop-blur-sm">
          {!isLoading && messages.length === 0 && (
            <PreChatQuickOptions onSelect={handleOptionSelect} />
          )}
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your question here..."
              className="min-h-[60px] max-h-[120px] resize-none border-2 focus:border-primary focus:shadow-glow transition-all"
              disabled={sendMessage.isPending}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || sendMessage.isPending}
              size="icon"
              className="h-[60px] w-[60px] shrink-0 shadow-glow hover:shadow-glow-lg transition-all"
            >
              {sendMessage.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
