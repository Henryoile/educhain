import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BlockchainTransaction = ({ file, metadata, onTransactionComplete }) => {
  const [transactionState, setTransactionState] = useState('preparing'); // preparing, estimating, confirming, processing, completed, failed
  const [gasEstimate, setGasEstimate] = useState(null);
  const [transactionHash, setTransactionHash] = useState('');
  const [ipfsHash, setIpfsHash] = useState('');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (file && metadata) {
      estimateGasFees();
    }
  }, [file, metadata]);

  const estimateGasFees = async () => {
    setTransactionState('estimating');
    
    // Simulate gas estimation
    setTimeout(() => {
      setGasEstimate({
        gasLimit: 150000,
        gasPrice: 25, // Gwei
        estimatedCost: 0.00375, // ETH
        usdCost: 8.25
      });
      setTransactionState('confirming');
    }, 2000);
  };

  const handleSubmitToBlockchain = async () => {
    setTransactionState('processing');
    setProgress(0);

    // Simulate blockchain transaction process
    const steps = [
      { name: 'Generating document hash', duration: 1500 },
      { name: 'Uploading to IPFS', duration: 3000 },
      { name: 'Creating smart contract transaction', duration: 2000 },
      { name: 'Waiting for blockchain confirmation', duration: 4000 },
      { name: 'Finalizing credential record', duration: 1000 }
    ];

    let currentProgress = 0;
    
    for (let i = 0; i < steps?.length; i++) {
      const step = steps?.[i];
      
      await new Promise(resolve => {
        setTimeout(() => {
          currentProgress = ((i + 1) / steps.length) * 100;
          setProgress(currentProgress);
          
          if (i === 1) {
            setIpfsHash('QmX7Kd9fJ2vN8pL3mR5qW9sT1uY6eH4cB7nA2zV8xK9fJ2v');
          }
          if (i === 3) {
            setTransactionHash('0x1234567890abcdef1234567890abcdef12345678');
          }
          
          resolve();
        }, step.duration);
      });
    }

    setTransactionState('completed');
    onTransactionComplete({
      transactionHash: '0x1234567890abcdef1234567890abcdef12345678',
      ipfsHash: 'QmX7Kd9fJ2vN8pL3mR5qW9sT1uY6eH4cB7nA2zV8xK9fJ2v',
      gasUsed: gasEstimate?.gasLimit,
      totalCost: gasEstimate?.estimatedCost
    });
  };

  const getStateIcon = () => {
    switch (transactionState) {
      case 'preparing': case'estimating':
        return 'Loader';
      case 'confirming':
        return 'AlertCircle';
      case 'processing':
        return 'Zap';
      case 'completed':
        return 'CheckCircle';
      case 'failed':
        return 'XCircle';
      default:
        return 'Clock';
    }
  };

  const getStateColor = () => {
    switch (transactionState) {
      case 'preparing': case'estimating':
        return 'text-warning';
      case 'confirming':
        return 'text-primary';
      case 'processing':
        return 'text-warning';
      case 'completed':
        return 'text-success';
      case 'failed':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStateMessage = () => {
    switch (transactionState) {
      case 'preparing':
        return 'Preparing blockchain transaction...';
      case 'estimating':
        return 'Estimating gas fees...';
      case 'confirming':
        return 'Ready for blockchain submission';
      case 'processing':
        return 'Processing blockchain transaction...';
      case 'completed':
        return 'Credential successfully stored on blockchain!';
      case 'failed':
        return 'Transaction failed. Please try again.';
      default:
        return 'Initializing...';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Zap" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Blockchain Transaction</h3>
          <p className="text-sm text-muted-foreground">
            Secure your credential on the blockchain
          </p>
        </div>
      </div>
      {/* Transaction Status */}
      <div className="mb-6">
        <div className="flex items-center space-x-3 mb-3">
          <Icon 
            name={getStateIcon()} 
            size={20} 
            className={`${getStateColor()} ${transactionState === 'processing' ? 'animate-spin' : ''}`} 
          />
          <span className="text-sm font-medium text-foreground">{getStateMessage()}</span>
        </div>
        
        {transactionState === 'processing' && (
          <div className="space-y-2">
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground text-center">{progress?.toFixed(0)}% complete</p>
          </div>
        )}
      </div>
      {/* Gas Fee Estimation */}
      {gasEstimate && transactionState !== 'completed' && (
        <div className="bg-muted rounded-lg p-4 mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">Transaction Cost Estimate</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Gas Limit:</span>
              <span className="font-mono text-foreground">{gasEstimate?.gasLimit?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Gas Price:</span>
              <span className="font-mono text-foreground">{gasEstimate?.gasPrice} Gwei</span>
            </div>
            <div className="flex justify-between text-sm border-t border-border pt-2">
              <span className="text-muted-foreground">Estimated Cost:</span>
              <div className="text-right">
                <span className="font-mono text-foreground">{gasEstimate?.estimatedCost} ETH</span>
                <span className="text-xs text-muted-foreground ml-2">(~${gasEstimate?.usdCost})</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Transaction Hashes */}
      {(ipfsHash || transactionHash) && (
        <div className="space-y-4 mb-6">
          {ipfsHash && (
            <div className="bg-success/5 border border-success/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Database" size={16} className="text-success" />
                <span className="text-sm font-medium text-success">IPFS Storage</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-success/80">Document Hash:</p>
                <p className="font-mono text-xs text-success break-all">{ipfsHash}</p>
              </div>
            </div>
          )}
          
          {transactionHash && (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Link" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Blockchain Transaction</span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-primary/80">Transaction Hash:</p>
                <p className="font-mono text-xs text-primary break-all">{transactionHash}</p>
              </div>
            </div>
          )}
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex justify-between">
        {transactionState === 'confirming' && (
          <>
            <Button
              variant="outline"
              onClick={() => setTransactionState('preparing')}
              iconName="ArrowLeft"
              iconPosition="left"
            >
              Back to Edit
            </Button>
            <Button
              variant="default"
              onClick={handleSubmitToBlockchain}
              iconName="Zap"
              iconPosition="left"
            >
              Submit to Blockchain
            </Button>
          </>
        )}
        
        {transactionState === 'completed' && (
          <div className="w-full flex justify-center">
            <Button
              variant="success"
              onClick={() => window.location.href = '/student-dashboard'}
              iconName="CheckCircle"
              iconPosition="left"
            >
              View in Dashboard
            </Button>
          </div>
        )}
        
        {transactionState === 'failed' && (
          <div className="w-full flex justify-center">
            <Button
              variant="outline"
              onClick={() => setTransactionState('confirming')}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Try Again
            </Button>
          </div>
        )}
      </div>
      {/* Security Notice */}
      {transactionState === 'confirming' && (
        <div className="mt-6 p-4 bg-warning/5 border border-warning/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-warning">Important Notice</p>
              <p className="text-xs text-warning/80">
                Once submitted to the blockchain, this credential cannot be modified or deleted. 
                Please ensure all information is correct before proceeding.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlockchainTransaction;