import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  filename?: string;
  onChange?: (code: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode = '# Start coding here...', 
  language = 'python',
  filename = 'code.py',
  onChange
}) => {
  const [code, setCode] = useState(initialCode);
  const [fontSize, setFontSize] = useState(14);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordWrap, setWordWrap] = useState<'on' | 'off'>('off');
  const [lineCount, setLineCount] = useState(0);
  const editorRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    setCode(initialCode);
    setLineCount(initialCode.split('\n').length);
  }, [initialCode]);

  const handleCodeChange = (value: string | undefined) => {
    const newCode = value || '';
    setCode(newCode);
    setLineCount(newCode.split('\n').length);
    onChange?.(newCode);
  };

  const handleEditorMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Success",
      description: "Code downloaded successfully",
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Copied",
      description: "Code copied to clipboard.",
    });
  };

  return (
    <div className={`w-full h-full flex flex-col border border-border/50 rounded-lg overflow-hidden bg-background shadow-2xl transition-all duration-300 ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      {/* Enhanced Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-muted via-muted/80 to-muted border-b border-border/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors cursor-pointer" />
          </div>
          <Separator orientation="vertical" className="h-4" />
          <span className="text-sm font-mono font-medium text-foreground">{filename}</span>
          <Badge variant="secondary" className="text-xs">
            {language}
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setFontSize(Math.max(10, fontSize - 1))}
            className="h-8 px-2 hover:bg-primary/10"
          >
            <ZoomOut className="h-3.5 w-3.5" />
          </Button>
          <span className="text-xs text-muted-foreground px-2 min-w-[3rem] text-center">{fontSize}px</span>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setFontSize(Math.min(24, fontSize + 1))}
            className="h-8 px-2 hover:bg-primary/10"
          >
            <ZoomIn className="h-3.5 w-3.5" />
          </Button>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setWordWrap(wordWrap === 'on' ? 'off' : 'on')}
            className="h-8 px-3 hover:bg-primary/10"
          >
            <RotateCw className="h-3.5 w-3.5 mr-1" />
            Wrap
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleCopy}
            className="h-8 px-3 hover:bg-primary/10"
          >
            <Copy className="h-3.5 w-3.5 mr-1" />
            Copy
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={handleDownload}
            className="h-8 px-3 hover:bg-primary/10"
          >
            <Download className="h-3.5 w-3.5 mr-1" />
            Save
          </Button>
          <Separator orientation="vertical" className="h-4 mx-1" />
          <Button 
            size="sm" 
            variant="ghost" 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="h-8 px-2 hover:bg-primary/10"
          >
            {isFullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </Button>
        </div>
      </div>
      
      {/* Editor Area */}
      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          onChange={handleCodeChange}
          onMount={handleEditorMount}
          theme="vs-dark"
          options={{
            minimap: { enabled: true },
            fontSize: fontSize,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: wordWrap,
            fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
            fontLigatures: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            padding: { top: 16, bottom: 16 },
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true,
            },
            renderLineHighlight: 'all',
            renderWhitespace: 'selection',
          }}
        />
      </div>
      
      {/* Footer Stats */}
      <div className="flex items-center justify-between px-4 py-1.5 bg-muted/50 border-t border-border/50 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>Lines: {lineCount}</span>
          <span>•</span>
          <span>Characters: {code.length}</span>
          <span>•</span>
          <span>Language: {language}</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            UTF-8
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
