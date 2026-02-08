import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, BookOpen } from 'lucide-react';
import { useKnowledgeEntries } from '../hooks/useKnowledgeEntries';
import KnowledgeEntryFormDialog from '../components/knowledge/KnowledgeEntryFormDialog';
import KnowledgeEntryCard from '../components/knowledge/KnowledgeEntryCard';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function KnowledgeBasePage() {
  const { data: entries = [], isLoading } = useKnowledgeEntries();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<{ id: bigint; question: string; answer: string } | null>(null);

  const handleEdit = (entry: { id: bigint; question: string; answer: string }) => {
    setEditingEntry(entry);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingEntry(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="text-muted-foreground mt-1">
            Manage your AI's knowledge entries
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)} size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Add Entry
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : entries.length === 0 ? (
        <Card className="border-2 border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-muted p-4 mb-4">
              <BookOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No knowledge entries yet</h3>
            <p className="text-muted-foreground text-center max-w-md mb-4">
              Start building your AI's knowledge base by adding your first entry. Each entry helps your assistant answer questions more accurately.
            </p>
            <Button onClick={() => setIsDialogOpen(true)} className="gap-2">
              <Plus className="h-4 w-4" />
              Add Your First Entry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Alert className="mb-6">
            <AlertDescription>
              You have {entries.length} knowledge {entries.length === 1 ? 'entry' : 'entries'}. Your assistant will search these to answer questions.
            </AlertDescription>
          </Alert>
          <div className="grid gap-4">
            {entries.map((entry) => (
              <KnowledgeEntryCard
                key={entry.id.toString()}
                entry={entry}
                onEdit={handleEdit}
              />
            ))}
          </div>
        </>
      )}

      <KnowledgeEntryFormDialog
        open={isDialogOpen}
        onOpenChange={handleCloseDialog}
        editingEntry={editingEntry}
      />
    </div>
  );
}
