import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
interface DatasetFiltersProps {
  selectedModalities: string[];
  selectedFormats: string[];
  onModalityChange: (modality: string) => void;
  onFormatChange: (format: string) => void;
}
export const DatasetFilters: React.FC<DatasetFiltersProps> = ({
  selectedModalities,
  selectedFormats,
  onModalityChange,
  onFormatChange
}) => {
  const modalities = [{
    id: '3d',
    label: '3D',
    icon: '🎮'
  }, {
    id: 'audio',
    label: 'Audio',
    icon: '🎵'
  }, {
    id: 'image',
    label: 'Image',
    icon: '🖼️'
  }, {
    id: 'tabular',
    label: 'Tabular',
    icon: '📊'
  }, {
    id: 'text',
    label: 'Text',
    icon: '📝'
  }, {
    id: 'video',
    label: 'Video',
    icon: '🎬'
  }, {
    id: 'time-series',
    label: 'Time-series',
    icon: '📈'
  }];
  const formats = [{
    id: 'json',
    label: 'json',
    icon: '{}'
  }, {
    id: 'csv',
    label: 'csv',
    icon: '##'
  }, {
    id: 'parquet',
    label: 'parquet',
    icon: '📦'
  }, {
    id: 'arrow',
    label: 'arrow',
    icon: '➡️'
  }];
  return <div className="space-y-6 p-4 glass-effect border border-border/50 rounded-lg">
      {/* Modalities */}
      <div>
        <h3 className="font-semibold text-sm mb-4">Modalities</h3>
        <div className="space-y-3">
          {modalities.map(modality => <div key={modality.id} className="flex items-center space-x-3">
              <Checkbox id={modality.id} checked={selectedModalities.includes(modality.id)} onCheckedChange={() => onModalityChange(modality.id)} />
              <Label htmlFor={modality.id} className="text-sm font-normal cursor-pointer flex items-center gap-2">
                
                {modality.label}
              </Label>
            </div>)}
        </div>
      </div>

      {/* Size Filter */}
      <div>
        <h3 className="font-semibold text-sm mb-4">Size (rows)</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>&lt;1K</span>
            <span>&gt;1T</span>
          </div>
          <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
        </div>
      </div>

      {/* Format */}
      <div>
        <h3 className="font-semibold text-sm mb-4">Format</h3>
        <div className="flex flex-wrap gap-2">
          {formats.map(format => <Badge key={format.id} variant={selectedFormats.includes(format.id) ? 'default' : 'outline'} className="cursor-pointer text-xs px-3 py-1" onClick={() => onFormatChange(format.id)}>
              <span className="mr-1">{format.icon}</span>
              {format.label}
            </Badge>)}
        </div>
      </div>
    </div>;
};