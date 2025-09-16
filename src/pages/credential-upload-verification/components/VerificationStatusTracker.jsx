import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationStatusTracker = ({ transactionData, onComplete }) => {
  const [verificationSteps, setVerificationSteps] = useState([
    {
      id: 1,
      name: 'Document Hash Verification',
      description: 'Verifying document integrity and IPFS storage',
      status: 'completed',
      timestamp: new Date(Date.now() - 300000),
      estimatedTime: '1-2 minutes'
    },
    {
      id: 2,
      name: 'Blockchain Confirmation',
      description: 'Waiting for blockchain network confirmation',
      status: 'completed',
      timestamp: new Date(Date.now() - 240000),
      estimatedTime: '3-5 minutes'
    },
    {
      id: 3,
      name: 'Institution Notification',
      description: 'Notifying institution for verification approval',
      status: 'in-progress',
      timestamp: null,
      estimatedTime: '24-48 hours'
    },
    {
      id: 4,
      name: 'Credential Verification',
      description: 'Institution reviewing and verifying credential authenticity',
      status: 'pending',
      timestamp: null,
      estimatedTime: '2-5 business days'
    },
    {
      id: 5,
      name: 'Final Approval',
      description: 'Credential approved and available for sharing',
      status: 'pending',
      timestamp: null,
      estimatedTime: '1-2 hours after verification'
    }
  ]);

  const [estimatedCompletion, setEstimatedCompletion] = useState('3-7 business days');

  useEffect(() => {
    // Simulate verification progress
    const timer = setTimeout(() => {
      setVerificationSteps(prev => prev?.map(step => {
        if (step?.id === 3) {
          return {
            ...step,
            status: 'completed',
            timestamp: new Date()
          };
        }
        if (step?.id === 4) {
          return {
            ...step,
            status: 'in-progress'
          };
        }
        return step;
      }));
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'pending':
        return 'Circle';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in-progress':
        return 'text-warning';
      case 'pending':
        return 'text-muted-foreground';
      case 'failed':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 border-success/20';
      case 'in-progress':
        return 'bg-warning/10 border-warning/20';
      case 'pending':
        return 'bg-muted border-border';
      case 'failed':
        return 'bg-error/10 border-error/20';
      default:
        return 'bg-muted border-border';
    }
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Pending';
    return timestamp?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const completedSteps = verificationSteps?.filter(step => step?.status === 'completed')?.length;
  const progressPercentage = (completedSteps / verificationSteps?.length) * 100;

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Verification Status</h3>
            <p className="text-sm text-muted-foreground">
              Track your credential verification progress
            </p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{completedSteps}/{verificationSteps?.length} Complete</p>
          <p className="text-xs text-muted-foreground">Est. {estimatedCompletion}</p>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-medium text-foreground">{progressPercentage?.toFixed(0)}%</span>
        </div>
        <div className="w-full bg-border rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      {/* Transaction Details */}
      {transactionData && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-3">Transaction Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Transaction Hash:</span>
              <p className="font-mono text-xs text-foreground break-all mt-1">
                {transactionData?.transactionHash}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">IPFS Hash:</span>
              <p className="font-mono text-xs text-foreground break-all mt-1">
                {transactionData?.ipfsHash}
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Gas Used:</span>
              <p className="font-mono text-xs text-foreground mt-1">
                {transactionData?.gasUsed?.toLocaleString()} units
              </p>
            </div>
            <div>
              <span className="text-muted-foreground">Total Cost:</span>
              <p className="font-mono text-xs text-foreground mt-1">
                {transactionData?.totalCost} ETH
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Verification Steps */}
      <div className="space-y-4">
        {verificationSteps?.map((step, index) => {
          const isLast = index === verificationSteps?.length - 1;
          
          return (
            <div key={step?.id} className="relative">
              <div className={`border rounded-lg p-4 transition-all duration-200 ${getStatusBgColor(step?.status)}`}>
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 ${getStatusColor(step?.status)}`}>
                    <Icon 
                      name={getStatusIcon(step?.status)} 
                      size={20}
                      className={step?.status === 'in-progress' ? 'animate-pulse' : ''}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-medium text-foreground">{step?.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(step?.timestamp)}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{step?.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        step?.status === 'completed' ? 'bg-success/20 text-success' :
                        step?.status === 'in-progress' ? 'bg-warning/20 text-warning' :
                        step?.status === 'failed'? 'bg-error/20 text-error' : 'bg-muted text-muted-foreground'
                      }`}>
                        {step?.status === 'completed' ? 'Completed' :
                         step?.status === 'in-progress' ? 'In Progress' :
                         step?.status === 'failed' ? 'Failed' : 'Pending'}
                      </span>
                      
                      {step?.status === 'pending' && (
                        <span className="text-xs text-muted-foreground">
                          Est. {step?.estimatedTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* Connector Line */}
              {!isLast && (
                <div className="absolute left-6 top-16 w-0.5 h-4 bg-border"></div>
              )}
            </div>
          );
        })}
      </div>
      {/* Action Buttons */}
      <div className="flex justify-between mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={() => window.location.href = '/student-dashboard'}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back to Dashboard
        </Button>
        
        <div className="flex space-x-3">
          <Button
            variant="ghost"
            iconName="RefreshCw"
            iconPosition="left"
          >
            Refresh Status
          </Button>
          
          {completedSteps === verificationSteps?.length && (
            <Button
              variant="success"
              onClick={onComplete}
              iconName="CheckCircle"
              iconPosition="left"
            >
              View Verified Credential
            </Button>
          )}
        </div>
      </div>
      {/* Help Section */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={16} className="text-primary mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary">Need Help?</p>
            <p className="text-xs text-primary/80">
              If your verification is taking longer than expected, contact your institution's 
              registrar office or reach out to our support team for assistance.
            </p>
            <div className="flex space-x-3 mt-2">
              <Button variant="ghost" size="sm" iconName="Mail">
                Contact Support
              </Button>
              <Button variant="ghost" size="sm" iconName="MessageCircle">
                Live Chat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationStatusTracker;