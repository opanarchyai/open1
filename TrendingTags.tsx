import { Badge } from '@/components/ui/badge';
import { TrendingUp } from 'lucide-react';

interface TrendingTagsProps {
  onTagClick: (tag: string) => void;
}

const trendingTags = [
  { name: 'vision', count: 0 },
  { name: 'motion', count: 0 },
  { name: 'speech', count: 0 },
  { name: 'control', count: 0 },
  { name: 'ros', count: 0 },
  { name: 'slam', count: 0 },
  { name: 'lidar', count: 0 },
  { name: 'kinematics', count: 0 },
];

export const TrendingTags = ({ onTagClick }: TrendingTagsProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <TrendingUp className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-semibold">Trending Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {trendingTags.map((tag) => (
          <Badge
            key={tag.name}
            variant="outline"
            className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors glass-effect"
            onClick={() => onTagClick(tag.name)}
          >
            #{tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
};