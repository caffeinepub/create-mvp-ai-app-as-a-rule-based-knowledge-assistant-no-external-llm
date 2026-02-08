import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useDeleteKnowledgeEntry } from '../../hooks/useKnowledgeEntries';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

interface KnowledgeEntryCardProps {
  entry: {
    id: bigint;
    question: string;
    answer: string;
  };
  onEdit: (entry: { id: bigint; question: string; answer: string }) => void;
}

export default function KnowledgeEntryCard({ entry, onEdit }: KnowledgeEntryCardProps) {
  const deleteEntry = useDeleteKnowledgeEntry();

  const handleDelete = async () => {
    await deleteEntry.mutateAsync(entry.id);
  };

  return (
    <Card className="border-2 hover:border-primary/60 hover:shadow-glow transition-all bg-gradient-to-br from-card via-card to-primary/5">
      <CardHeader className="bg-gradient-to-r from-primary/5 via-accent/5 to-transparent border-b-2">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg leading-tight font-semibold">{entry.question}</CardTitle>
          <div className="flex gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onEdit(entry)}
              className="h-8 w-8 hover:bg-accent/20 hover:text-accent transition-all"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/20 transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="border-2">
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete knowledge entry?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this knowledge entry from your assistant.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-md">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap">{entry.answer}</p>
      </CardContent>
    </Card>
  );
}
