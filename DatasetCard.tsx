import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Database } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface DatasetCardProps {
  id: string;
  name: string;
  author: string;
  description: string;
  updated: string;
  size: string;
  format: string[];
  modality: string[];
  url: string;
}
export const DatasetCard: React.FC<DatasetCardProps> = ({
  id,
  name,
  author,
  description,
  updated,
  size,
  format,
  modality
}) => {
  const navigate = useNavigate();
  return <Card className="glass-effect border-border/50 hover:border-primary/50 transition-all duration-300 overflow-hidden group cursor-pointer" onClick={() => navigate(`/dataset/${encodeURIComponent(id)}`)}>
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Database className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              <h3 className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                {author}/{name}
              </h3>
            </div>
            <Badge variant="outline" className="text-xs">
              Viewer
            </Badge>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Modalities & Format */}
        <div className="flex flex-wrap gap-1.5">
          {modality.map(mod => <Badge key={mod} variant="secondary" className="text-xs px-2 py-0.5">
              {mod}
            </Badge>)}
          {format.map(fmt => <Badge key={fmt} variant="outline" className="text-xs px-2 py-0.5">
              {fmt}
            </Badge>)}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t border-border/50">
          <span>Updated {updated}</span>
          <span className="font-mono">{size}</span>
        </div>

      </div>
    </Card>;
};