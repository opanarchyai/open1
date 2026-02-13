import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface ItemCardProps {
  id: string;
  author: string;
  tags: string[];
  type: 'datasets' | 'models';
  url: string;
}

export const ItemCard = ({ id, author, tags, type, url }: ItemCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (type === 'models') {
      navigate(`/model/${encodeURIComponent(id)}`);
    } else {
      navigate(`/dataset/${encodeURIComponent(id)}`);
    }
  };

  return (
    <Card className="card-hover shine-effect h-full flex flex-col cursor-pointer" onClick={handleClick}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2 mb-2">
          <CardTitle className="text-lg line-clamp-1">{id.split('/')[1] || id}</CardTitle>
          <Badge variant="outline" className="text-xs shrink-0">
            {type === 'datasets' ? 'Dataset' : 'Model'}
          </Badge>
        </div>
        <CardDescription className="text-xs line-clamp-1">by {author}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div className="flex flex-wrap gap-1 mb-4">
          {tags.slice(0, 3).map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center justify-end">
          <Button
            size="sm"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="h-7 text-xs"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            View
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
