import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ChatMessage } from '../backend';

export function useChatHistory() {
  const { actor, isFetching } = useActor();

  return useQuery<ChatMessage[]>({
    queryKey: ['chatHistory'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getChatHistory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSendMessage() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (message: string) => {
      if (!actor) throw new Error('Actor not available');

      // Add user message
      await actor.addChatMessage(message);

      // Search knowledge base for matching entries
      const results = await actor.searchKnowledge(message);

      // Generate assistant response
      let assistantMessage: string;
      if (results.length > 0) {
        // Use the first matching entry's answer
        assistantMessage = results[0].answer;
      } else {
        // Fallback message when no knowledge entry matches
        assistantMessage = "I couldn't find an answer to that question in my knowledge base. Please add relevant knowledge entries in the Knowledge Base section to help me answer better!";
      }

      // Add assistant message
      await actor.addChatMessage(assistantMessage);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chatHistory'] });
    },
  });
}
