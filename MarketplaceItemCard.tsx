import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Code2, Download, ExternalLink } from 'lucide-react';
interface MarketplaceItemCardProps {
  item: any;
  onOpenEditor?: (item: any) => void;
}
export const MarketplaceItemCard = ({
  item,
  onOpenEditor
}: MarketplaceItemCardProps) => {
  const handleOpenInEditor = () => {
    onOpenEditor?.(item);
  };
  return <Card className="hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg animate-fade-in group h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base group-hover:text-primary transition-colors truncate">
              {item.title}
            </CardTitle>
            <CardDescription className="text-xs mt-1 truncate">
              {item.author || item.profiles?.username || 'Unknown'}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="capitalize text-xs shrink-0">
            {item.item_type}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3 flex-1 pb-3">
        <p className="text-xs text-muted-foreground line-clamp-2">
          {item.description}
        </p>

        {item.language && <div className="text-xs text-muted-foreground">
            {item.language}
          </div>}

        <div className="flex flex-wrap gap-1">
          {item.tags?.slice(0, 4).map((tag: string, index: number) => <Badge key={`${tag}-${index}`} variant="outline" className="text-xs px-1.5 py-0">
              {tag}
            </Badge>)}
        </div>
      </CardContent>

      <div className="px-6 pb-4 mt-auto">
        <div className="flex gap-2">
          <Button size="sm" variant="default" onClick={handleOpenInEditor} className="flex-1">
            <Code2 className="h-3.5 w-3.5 mr-1.5" />
            Open in Editor
          </Button>

          <Button size="sm" variant="outline" asChild className="px-3">
            
          </Button>
        </div>
      </div>
    </Card>;
};