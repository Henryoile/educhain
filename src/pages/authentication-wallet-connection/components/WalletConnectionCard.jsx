import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WalletConnectionCard = ({ onWalletConnect, connectionStatus, walletAddress }) => {
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const walletOptions = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: 'Wallet',
      description: 'Connect using MetaMask browser extension',
      isInstalled: true,
      color: 'bg-orange-500'
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: 'Smartphone',
      description: 'Connect using mobile wallet app',
      isInstalled: true,
      color: 'bg-blue-500'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      icon: 'CreditCard',
      description: 'Connect using Coinbase Wallet',
      isInstalled: false,
      color: 'bg-blue-600'
    }
  ];

  const handleWalletSelect = async (walletId) => {
    setSelectedWallet(walletId);
    setIsConnecting(true);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      onWalletConnect(walletId);
    } catch (error) {
      console.error('Wallet connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setSelectedWallet(null);
    onWalletConnect(null);
  };

  if (connectionStatus === 'connected' && walletAddress) {
    return (
      <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircle" size={32} color="white" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-foreground">Wallet Connected</h3>
            <p className="text-muted-foreground">Your wallet is successfully connected to EduChain</p>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Wallet Address</span>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs text-success">Connected</span>
              </div>
            </div>
            <div className="font-mono text-sm text-muted-foreground break-all">
              {walletAddress}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-foreground">2.45 ETH</div>
              <div className="text-muted-foreground">Balance</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">Sepolia</div>
              <div className="text-muted-foreground">Network</div>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            onClick={handleDisconnect}
            iconName="LogOut"
            className="w-full"
          >
            Disconnect Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Connect Your Wallet</h3>
          <p className="text-muted-foreground">Choose your preferred wallet to access EduChain securely</p>
        </div>
        
        <div className="space-y-3">
          {walletOptions?.map((wallet) => (
            <button
              key={wallet?.id}
              onClick={() => handleWalletSelect(wallet?.id)}
              disabled={!wallet?.isInstalled || isConnecting}
              className={`w-full p-4 border border-border rounded-lg transition-all duration-200 hover:border-primary hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed ${
                selectedWallet === wallet?.id && isConnecting ? 'border-primary bg-primary/5' : 'bg-background'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${wallet?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name={wallet?.icon} size={24} color="white" />
                </div>
                
                <div className="flex-1 text-left">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{wallet?.name}</h4>
                    {!wallet?.isInstalled && (
                      <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded">
                        Not Installed
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{wallet?.description}</p>
                </div>
                
                <div className="flex-shrink-0">
                  {selectedWallet === wallet?.id && isConnecting ? (
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <div className="pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={16} />
            <span>Your wallet connection is secured with end-to-end encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletConnectionCard;