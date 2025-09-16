import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BlockchainMonitor = () => {
  const [networkStats, setNetworkStats] = useState({
    blockHeight: 18542367,
    gasPrice: 25,
    networkStatus: 'healthy',
    confirmationTime: 12,
    pendingTransactions: 3,
    totalTransactions: 1247
  });

  const [recentTransactions, setRecentTransactions] = useState([
    {
      id: 1,
      hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      type: 'credential_verification',
      status: 'confirmed',
      timestamp: '2024-08-28T15:45:00Z',
      gasUsed: '21000',
      gasFee: '0.00052 ETH',
      blockNumber: 18542367,
      confirmations: 12,
      from: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      to: '0x8ba1f109551bD432803012645Hac136c0532925a',
      credentialId: 'CRED-2024-001234'
    },
    {
      id: 2,
      hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
      type: 'credential_issued',
      status: 'confirmed',
      timestamp: '2024-08-28T15:30:00Z',
      gasUsed: '45000',
      gasFee: '0.00112 ETH',
      blockNumber: 18542365,
      confirmations: 14,
      from: '0x8ba1f109551bD432803012645Hac136c0532925a',
      to: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      credentialId: 'CRED-2024-001235'
    },
    {
      id: 3,
      hash: '0x3c4d5e6f7890abcdef1234567890abcdef123456',
      type: 'document_upload',
      status: 'pending',
      timestamp: '2024-08-28T15:50:00Z',
      gasUsed: '32000',
      gasFee: '0.00080 ETH',
      blockNumber: null,
      confirmations: 0,
      from: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      to: '0x9cb2f210662cE543904012756Iac247d0643036b',
      credentialId: 'CRED-2024-001236'
    }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStats(prev => ({
        ...prev,
        blockHeight: prev?.blockHeight + Math.floor(Math.random() * 2),
        gasPrice: prev?.gasPrice + Math.floor(Math.random() * 10 - 5),
        confirmationTime: prev?.confirmationTime + Math.floor(Math.random() * 6 - 3)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'credential_verification': return 'Shield';
      case 'credential_issued': return 'FileCheck';
      case 'document_upload': return 'Upload';
      default: return 'Activity';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'failed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatAddress = (address) => {
    return `${address?.substring(0, 6)}...${address?.substring(address?.length - 4)}`;
  };

  return (
    <div className="space-y-6">
      {/* Network Status */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Blockchain Network Status</h2>
              <p className="text-sm text-muted-foreground">Real-time Ethereum network monitoring</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success">Network Healthy</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{networkStats?.blockHeight?.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Block Height</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{networkStats?.gasPrice}</div>
            <div className="text-xs text-muted-foreground">Gas Price (Gwei)</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{networkStats?.confirmationTime}s</div>
            <div className="text-xs text-muted-foreground">Avg Confirmation</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-warning">{networkStats?.pendingTransactions}</div>
            <div className="text-xs text-muted-foreground">Pending Txns</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-foreground">{networkStats?.totalTransactions?.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground">Total Txns</div>
          </div>
          
          <div className="text-center p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-success">99.9%</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
        </div>
      </div>
      {/* Recent Transactions */}
      <div className="bg-surface rounded-lg border border-border">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="List" size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">Recent Transactions</h2>
                <p className="text-sm text-muted-foreground">Latest credential-related blockchain activity</p>
              </div>
            </div>
            
            <Button variant="outline" size="sm" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {recentTransactions?.map((tx) => (
              <div key={tx?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Icon name={getTransactionIcon(tx?.type)} size={20} className="text-muted-foreground" />
                    <div>
                      <h3 className="font-medium text-foreground capitalize">
                        {tx?.type?.replace('_', ' ')}
                      </h3>
                      <p className="text-sm font-mono text-muted-foreground">{tx?.credentialId}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tx?.status)}`}>
                      <span className="capitalize">{tx?.status}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{formatTimestamp(tx?.timestamp)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div>
                    <label className="text-muted-foreground">Transaction Hash</label>
                    <p className="font-mono text-foreground">{formatAddress(tx?.hash)}</p>
                  </div>
                  
                  <div>
                    <label className="text-muted-foreground">From/To</label>
                    <p className="font-mono text-foreground">
                      {formatAddress(tx?.from)} → {formatAddress(tx?.to)}
                    </p>
                  </div>
                  
                  <div>
                    <label className="text-muted-foreground">Gas Used/Fee</label>
                    <p className="text-foreground">{tx?.gasUsed} / {tx?.gasFee}</p>
                  </div>
                  
                  <div>
                    <label className="text-muted-foreground">Block/Confirmations</label>
                    <p className="text-foreground">
                      {tx?.blockNumber ? `#${tx?.blockNumber}` : 'Pending'} / {tx?.confirmations}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 mt-3">
                  <Button variant="ghost" size="xs" iconName="ExternalLink">
                    View on Explorer
                  </Button>
                  <Button variant="ghost" size="xs" iconName="Copy">
                    Copy Hash
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Gas Tracker */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Fuel" size={20} className="text-warning" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Gas Tracker</h2>
            <p className="text-sm text-muted-foreground">Current network gas prices for different transaction speeds</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Slow</span>
              <Icon name="Turtle" size={16} className="text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">18 Gwei</div>
            <div className="text-xs text-muted-foreground">~5 minutes</div>
          </div>
          
          <div className="p-4 border border-primary rounded-lg bg-primary/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Standard</span>
              <Icon name="Zap" size={16} className="text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">{networkStats?.gasPrice} Gwei</div>
            <div className="text-xs text-muted-foreground">~2 minutes</div>
          </div>
          
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Fast</span>
              <Icon name="Rocket" size={16} className="text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold text-foreground">35 Gwei</div>
            <div className="text-xs text-muted-foreground">~30 seconds</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockchainMonitor;