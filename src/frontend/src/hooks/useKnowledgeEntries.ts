import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { KnowledgeEntry } from '../backend';

export function useKnowledgeEntries() {
  const { actor, isFetching } = useActor();

  return useQuery<KnowledgeEntry[]>({
    queryKey: ['knowledgeEntries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getKnowledgeEntries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddKnowledgeEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ question, answer }: { question: string; answer: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addKnowledgeEntry(question, answer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeEntries'] });
    },
  });
}

export function useUpdateKnowledgeEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, question, answer }: { id: bigint; question: string; answer: string }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateKnowledgeEntry(id, question, answer);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeEntries'] });
    },
  });
}

export function useDeleteKnowledgeEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error('Actor not available');
      return actor.deleteKnowledgeEntry(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['knowledgeEntries'] });
    },
  });
}
