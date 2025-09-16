import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NetworkSelector = ({ selectedNetwork, onNetworkChange, showAdvanced, onToggleAdvanced }) => {
  const [customRPC, setCustomRPC] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  const networks = [
    {
      id: 'sepolia',
      name: 'Sepolia Testnet',
      chainId: '11155111',
      rpcUrl: 'https://sepolia.infura.io/v3/',
      blockExplorer: 'https://sepolia.etherscan.io',
      currency: 'SepoliaETH',
      status: 'active',
      recommended: true,
      color: 'bg-blue-500'
    },
    {
      id: 'goerli',
      name: 'Goerli Testnet',
      chainId: '5',
      rpcUrl: 'https://goerli.infura.io/v3/',
      blockExplorer: 'https://goerli.etherscan.io',
      currency: 'GoerliETH',
      status: 'deprecated',
      recommended: false,
      color: 'bg-orange-500'
    },
    {
      id: 'mumbai',
      name: 'Polygon Mumbai',
      chainId: '80001',
      rpcUrl: 'https://rpc-mumbai.maticvigil.com',
      blockExplorer: 'https://mumbai.polygonscan.com',
      currency: 'MATIC',
      status: 'active',
      recommended: false,
      color: 'bg-purple-500'
    },
    {
      id: 'localhost',
      name: 'Local Development',
      chainId: '1337',
      rpcUrl: 'http://localhost:8545',
      blockExplorer: 'http://localhost:8545',
      currency: 'ETH',
      status: 'development',
      recommended: false,
      color: 'bg-gray-500'
    }
  ];

  const handleNetworkSelect = (network) => {
    onNetworkChange(network);
  };

  const handleAddCustomRPC = () => {
    if (customRPC?.trim()) {
      const customNetwork = {
        id: 'custom',
        name: 'Custom RPC',
        chainId: 'unknown',
        rpcUrl: customRPC,
        blockExplorer: '',
        currency: 'ETH',
        status: 'custom',
        recommended: false,
        color: 'bg-gray-600'
      };
      onNetworkChange(customNetwork);
      setCustomRPC('');
      setIsAddingCustom(false);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Network Selection</h3>
            <p className="text-sm text-muted-foreground">Choose your blockchain network</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleAdvanced}
            iconName={showAdvanced ? 'ChevronUp' : 'ChevronDown'}
          >
            Advanced
          </Button>
        </div>
        
        <div className="space-y-3">
          {networks?.map((network) => (
            <div
              key={network?.id}
              onClick={() => handleNetworkSelect(network)}
              className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedNetwork?.id === network?.id
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/50 hover:shadow-sm'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`w-10 h-10 ${network?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon name="Globe" size={20} color="white" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{network?.name}</h4>
                    {network?.recommended && (
                      <span className="text-xs bg-success/10 text-success px-2 py-1 rounded">
                        Recommended
                      </span>
                    )}
                    {network?.status === 'deprecated' && (
                      <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded">
                        Deprecated
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 mt-1">
                    <span className="text-sm text-muted-foreground">Chain ID: {network?.chainId}</span>
                    <span className="text-sm text-muted-foreground">Currency: {network?.currency}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    network?.status === 'active' ? 'bg-success' : 
                    network?.status === 'deprecated' ? 'bg-warning' : 
                    network?.status === 'development' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></div>
                  {selectedNetwork?.id === network?.id && (
                    <Icon name="Check" size={16} className="text-primary" />
                  )}
                </div>
              </div>
              
              {showAdvanced && selectedNetwork?.id === network?.id && (
                <div className="mt-4 pt-4 border-t border-border space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-foreground">RPC URL:</span>
                      <div className="font-mono text-muted-foreground break-all">{network?.rpcUrl}</div>
                    </div>
                    <div>
                      <span className="font-medium text-foreground">Block Explorer:</span>
                      <div className="font-mono text-muted-foreground break-all">{network?.blockExplorer}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        {showAdvanced && (
          <div className="pt-4 border-t border-border space-y-4">
            <div>
              <h4 className="font-medium text-foreground mb-2">Custom RPC Endpoint</h4>
              <p className="text-sm text-muted-foreground mb-3">
                Add a custom RPC endpoint for advanced users
              </p>
              
              {!isAddingCustom ? (
                <Button
                  variant="outline"
                  onClick={() => setIsAddingCustom(true)}
                  iconName="Plus"
                  size="sm"
                >
                  Add Custom RPC
                </Button>
              ) : (
                <div className="space-y-3">
                  <div className="flex space-x-2">
                    <input
                      type="url"
                      value={customRPC}
                      onChange={(e) => setCustomRPC(e?.target?.value)}
                      placeholder="https://your-custom-rpc-endpoint.com"
                      className="flex-1 px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleAddCustomRPC}
                      disabled={!customRPC?.trim()}
                      iconName="Check"
                    >
                      Add
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setIsAddingCustom(false);
                        setCustomRPC('');
                      }}
                      iconName="X"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Make sure the RPC endpoint is secure and trusted
                  </p>
                </div>
              )}
            </div>
            
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <div className="font-medium text-warning mb-1">Advanced Settings</div>
                  <div className="text-warning/80">
                    Only modify these settings if you understand the implications. 
                    Incorrect configuration may result in connection issues.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkSelector;