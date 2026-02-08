import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useAddKnowledgeEntry, useUpdateKnowledgeEntry } from '../../hooks/useKnowledgeEntries';
import { toast } from 'sonner';

interface KnowledgeEntryFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingEntry?: { id: bigint; question: string; answer: string } | null;
}

export default function KnowledgeEntryFormDialog({
  open,
  onOpenChange,
  editingEntry,
}: KnowledgeEntryFormDialogProps) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [errors, setErrors] = useState<{ question?: string; answer?: string }>({});

  const addEntry = useAddKnowledgeEntry();
  const updateEntry = useUpdateKnowledgeEntry();

  useEffect(() => {
    if (editingEntry) {
      setQuestion(editingEntry.question);
      setAnswer(editingEntry.answer);
    } else {
      setQuestion('');
      setAnswer('');
    }
    setErrors({});
  }, [editingEntry, open]);

  const validate = () => {
    const newErrors: { question?: string; answer?: string } = {};
    
    if (!question.trim()) {
      newErrors.question = 'Question is required';
    }
    
    if (!answer.trim()) {
      newErrors.answer = 'Answer is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    try {
      if (editingEntry) {
        await updateEntry.mutateAsync({
          id: editingEntry.id,
          question: question.trim(),
          answer: answer.trim(),
        });
        toast.success('Knowledge entry updated successfully');
      } else {
        await addEntry.mutateAsync({
          question: question.trim(),
          answer: answer.trim(),
        });
        toast.success('Knowledge entry added successfully');
      }
      onOpenChange(false);
    } catch (error) {
      toast.error('Failed to save knowledge entry');
    }
  };

  const isPending = addEntry.isPending || updateEntry.isPending;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] border-2 shadow-glow">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl">{editingEntry ? 'Edit' : 'Add'} Knowledge Entry</DialogTitle>
            <DialogDescription>
              {editingEntry
                ? 'Update the question and answer for this knowledge entry.'
                : 'Add a new question and answer to your knowledge base.'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="question" className="font-medium">Question</Label>
              <Input
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What question should this answer?"
                disabled={isPending}
                className={`border-2 focus:border-primary focus:shadow-glow transition-all ${errors.question ? 'border-destructive' : ''}`}
              />
              {errors.question && (
                <p className="text-sm text-destructive font-medium">{errors.question}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="answer" className="font-medium">Answer</Label>
              <Textarea
                id="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Provide a detailed answer..."
                className={`min-h-[150px] border-2 focus:border-primary focus:shadow-glow transition-all ${errors.answer ? 'border-destructive' : ''}`}
                disabled={isPending}
              />
              {errors.answer && (
                <p className="text-sm text-destructive font-medium">{errors.answer}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="border-2"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending} className="shadow-glow hover:shadow-glow-lg transition-all">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {editingEntry ? 'Update' : 'Add'} Entry
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
