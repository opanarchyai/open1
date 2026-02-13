import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const CreateItemDialog = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    item_type: 'code' as 'code' | 'dataset' | 'model',
    category: '',
    tags: '',
    language: '',
    framework: '',
    readme: '',
    repository_url: '',
    price_opan: '',
    price_sol: '',
    is_free: true,
    license: 'MIT',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please sign in to create items');
      return;
    }

    setLoading(true);
    try {
      // Get user's profile
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!profile) {
        toast.error('Profile not found. Please complete your profile first.');
        return;
      }

      const { error } = await supabase.from('marketplace_items').insert({
        author_id: profile.id,
        title: formData.title,
        description: formData.description,
        item_type: formData.item_type,
        category: formData.category || null,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
        language: formData.language || null,
        framework: formData.framework || null,
        readme: formData.readme || null,
        repository_url: formData.repository_url || null,
        price_opan: formData.is_free ? 0 : parseFloat(formData.price_opan) || 0,
        price_sol: formData.is_free ? 0 : parseFloat(formData.price_sol) || 0,
        is_free: formData.is_free,
        license: formData.license,
        status: 'published',
      });

      if (error) throw error;

      toast.success('Item created successfully!');
      setOpen(false);
      setFormData({
        title: '',
        description: '',
        item_type: 'code',
        category: '',
        tags: '',
        language: '',
        framework: '',
        readme: '',
        repository_url: '',
        price_opan: '',
        price_sol: '',
        is_free: true,
        license: 'MIT',
      });
      
      // Refresh the page to show new item
      window.location.reload();
    } catch (error: any) {
      toast.error(error.message || 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-bg">
          <Plus className="h-4 w-4 mr-2" />
          Publish New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Publish to Marketplace</DialogTitle>
          <DialogDescription>
            Share your code, datasets, or models with the robotics community
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="e.g., Advanced Robot Navigation System"
            />
          </div>

          <div>
            <Label htmlFor="item_type">Type *</Label>
            <Select
              value={formData.item_type}
              onValueChange={(value: 'code' | 'dataset' | 'model') =>
                setFormData({ ...formData, item_type: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="code">Code/Module</SelectItem>
                <SelectItem value="dataset">Dataset</SelectItem>
                <SelectItem value="model">AI Model</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              placeholder="Describe your item..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Navigation"
              />
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Input
                id="language"
                value={formData.language}
                onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                placeholder="e.g., Python"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="e.g., navigation, slam, ros2"
            />
          </div>

          <div>
            <Label htmlFor="repository_url">Repository URL</Label>
            <Input
              id="repository_url"
              value={formData.repository_url}
              onChange={(e) => setFormData({ ...formData, repository_url: e.target.value })}
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <Label htmlFor="readme">README</Label>
            <Textarea
              id="readme"
              value={formData.readme}
              onChange={(e) => setFormData({ ...formData, readme: e.target.value })}
              placeholder="Markdown formatted documentation..."
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_free"
                checked={formData.is_free}
                onChange={(e) => setFormData({ ...formData, is_free: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="is_free">Free (Open Source)</Label>
            </div>

            {!formData.is_free && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price_opan">Price in $OPAN</Label>
                  <Input
                    id="price_opan"
                    type="number"
                    step="0.0001"
                    value={formData.price_opan}
                    onChange={(e) => setFormData({ ...formData, price_opan: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="price_sol">Price in SOL</Label>
                  <Input
                    id="price_sol"
                    type="number"
                    step="0.000000001"
                    value={formData.price_sol}
                    onChange={(e) => setFormData({ ...formData, price_sol: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="gradient-bg">
              {loading ? 'Publishing...' : 'Publish Item'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};