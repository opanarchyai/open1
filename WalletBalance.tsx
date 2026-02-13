import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const WalletBalance = () => {
  const balance = 0;

  return (
    <Card className="glass-effect border-border/50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg gradient-bg">
            <Wallet className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">$OPAN Balance</p>
            <p className="text-2xl font-bold gradient-text">{balance.toLocaleString()}</p>
          </div>
        </div>
        <Button size="sm" className="gradient-bg">
          Connect Wallet
        </Button>
      </div>
    </Card>
  );
};