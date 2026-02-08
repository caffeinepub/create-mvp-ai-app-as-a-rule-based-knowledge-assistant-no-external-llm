import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, BookOpen, Sparkles } from 'lucide-react';
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
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
            Knowledge Base
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your assistant's knowledge entries
          </p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="gap-2 shadow-glow hover:shadow-glow-lg transition-all"
        >
          <Plus className="h-4 w-4" />
          Add Entry
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <p className="text-sm text-muted-foreground">Loading knowledge base...</p>
          </div>
        </div>
      ) : entries.length === 0 ? (
        <Card className="border-2 border-dashed shadow-glow bg-gradient-to-br from-card via-card to-accent/5">
          <CardHeader className="text-center pb-4">
            <div className="inline-flex mx-auto p-4 rounded-2xl bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 shadow-glow mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-xl">No knowledge entries yet</CardTitle>
            <CardDescription>
              Start building your knowledge base by adding your first entry
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center pb-6">
            <Alert className="mb-4 border-2 border-accent/30 bg-gradient-to-r from-accent/10 to-accent/5">
              <Sparkles className="h-4 w-4 text-accent" />
              <AlertDescription className="text-sm">
                Add questions and answers to teach your assistant. The more you add, the smarter it becomes!
              </AlertDescription>
            </Alert>
            <Button
              onClick={() => setIsDialogOpen(true)}
              size="lg"
              className="gap-2 shadow-glow hover:shadow-glow-lg transition-all"
            >
              <Plus className="h-5 w-5" />
              Add Your First Entry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {entries.map((entry) => (
            <KnowledgeEntryCard key={entry.id.toString()} entry={entry} onEdit={handleEdit} />
          ))}
        </div>
      )}

      <KnowledgeEntryFormDialog
        open={isDialogOpen}
        onOpenChange={handleCloseDialog}
        editingEntry={editingEntry}
      />
    </div>
  );
}
