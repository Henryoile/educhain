import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BlockchainMonitor = () => {
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'credential_verification',
      title: 'AWS Certificate Verification',
      hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
      status: 'pending',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      gasUsed: '0.0023 ETH',
      blockNumber: null,
      confirmations: 0
    },
    {
      id: 2,
      type: 'job_application',
      title: 'Smart Contract Job Application',
      hash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
      status: 'confirmed',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      gasUsed: '0.0045 ETH',
      blockNumber: 18234567,
      confirmations: 12
    },
    {
      id: 3,
      type: 'skill_verification',
      title: 'React Certification Verification',
      hash: '0x3c4d5e6f7890abcdef1234567890abcdef123456',
      status: 'confirmed',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      gasUsed: '0.0018 ETH',
      blockNumber: 18234521,
      confirmations: 24
    }
  ]);

  const [walletInfo, setWalletInfo] = useState({
    address: '0x1234...5678',
    balance: '2.4567 ETH',
    network: 'Ethereum Mainnet',
    connected: true
  });

  const [networkStats, setNetworkStats] = useState({
    gasPrice: '25 gwei',
    blockTime: '12.5s',
    pendingTxs: 3,
    totalTxs: 47
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions(prev => 
        prev?.map(tx => {
          if (tx?.status === 'pending' && Math.random() > 0.7) {
            return {
              ...tx,
              status: 'confirmed',
              blockNumber: 18234567 + Math.floor(Math.random() * 100),
              confirmations: Math.floor(Math.random() * 20) + 1
            };
          }
          if (tx?.status === 'confirmed' && tx?.confirmations < 50) {
            return {
              ...tx,
              confirmations: tx?.confirmations + 1
            };
          }
          return tx;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'failed': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'AlertCircle';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'credential_verification': return 'Shield';
      case 'job_application': return 'Send';
      case 'skill_verification': return 'Award';
      default: return 'Activity';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const truncateHash = (hash) => {
    return `${hash?.slice(0, 6)}...${hash?.slice(-4)}`;
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Activity" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Blockchain Monitor</h2>
              <p className="text-sm text-muted-foreground">Real-time transaction tracking</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${walletInfo?.connected ? 'bg-success' : 'bg-error'} animate-pulse`}></div>
            <span className="text-sm text-muted-foreground">
              {walletInfo?.connected ? 'Connected' : 'Disconnected'}
            </span>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Wallet Info */}
        <div className="bg-card border border-border rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Wallet Information</h3>
            <Button variant="outline" size="xs" iconName="RefreshCw">
              Refresh
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground">Address</label>
              <p className="text-sm font-mono text-foreground">{walletInfo?.address}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Balance</label>
              <p className="text-sm font-semibold text-foreground">{walletInfo?.balance}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Network</label>
              <p className="text-sm text-foreground">{walletInfo?.network}</p>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground">Gas Price</label>
              <p className="text-sm text-foreground">{networkStats?.gasPrice}</p>
            </div>
          </div>
        </div>

        {/* Network Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Block Time</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{networkStats?.blockTime}</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Loader" size={16} className="text-warning" />
              <span className="text-sm font-medium text-foreground">Pending</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{networkStats?.pendingTxs}</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Total TXs</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{networkStats?.totalTxs}</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Fuel" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">Gas Price</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{networkStats?.gasPrice}</p>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
            >
              View on Explorer
            </Button>
          </div>

          <div className="space-y-3">
            {transactions?.map((tx) => (
              <div
                key={tx?.id}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={getTransactionIcon(tx?.type)} size={18} className="text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-foreground mb-1">{tx?.title}</h4>
                        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                          <span className="font-mono">{truncateHash(tx?.hash)}</span>
                          <span>•</span>
                          <span>{formatTimeAgo(tx?.timestamp)}</span>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(tx?.status)}`}>
                        <div className="flex items-center space-x-1">
                          <Icon name={getStatusIcon(tx?.status)} size={10} />
                          <span className="capitalize">{tx?.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">Gas Used:</span>
                        <span className="ml-1 font-medium text-foreground">{tx?.gasUsed}</span>
                      </div>
                      {tx?.blockNumber && (
                        <div>
                          <span className="text-muted-foreground">Block:</span>
                          <span className="ml-1 font-mono text-foreground">{tx?.blockNumber}</span>
                        </div>
                      )}
                      {tx?.confirmations > 0 && (
                        <div>
                          <span className="text-muted-foreground">Confirmations:</span>
                          <span className="ml-1 font-medium text-foreground">{tx?.confirmations}</span>
                        </div>
                      )}
                      <div className="flex justify-end">
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="ExternalLink"
                          iconPosition="right"
                        >
                          View
                        </Button>
                      </div>
                    </div>

                    {tx?.status === 'pending' && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span>Transaction Progress</span>
                          <span>Waiting for confirmation...</span>
                        </div>
                        <div className="w-full bg-border rounded-full h-1">
                          <div className="bg-warning h-1 rounded-full w-1/3 animate-pulse"></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {transactions?.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Activity" size={20} className="text-muted-foreground" />
              </div>
              <h4 className="font-medium text-foreground mb-1">No Transactions</h4>
              <p className="text-sm text-muted-foreground">
                Your blockchain transactions will appear here
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockchainMonitor;