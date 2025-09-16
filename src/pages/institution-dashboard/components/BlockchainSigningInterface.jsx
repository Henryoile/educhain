import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const BlockchainSigningInterface = ({ signingQueue, onSignCredential, onDeployContract }) => {
  const [selectedCredential, setSelectedCredential] = useState(null);
  const [signingInProgress, setSigningInProgress] = useState(false);
  const [contractDeployment, setContractDeployment] = useState({
    status: 'idle',
    txHash: null,
    contractAddress: null
  });

  const handleSignCredential = async (credentialId) => {
    setSigningInProgress(true);
    try {
      await onSignCredential(credentialId);
      setSelectedCredential(null);
    } catch (error) {
      console.error('Signing failed:', error);
    } finally {
      setSigningInProgress(false);
    }
  };

  const handleDeployContract = async () => {
    setContractDeployment({ status: 'deploying', txHash: null, contractAddress: null });
    try {
      const result = await onDeployContract();
      setContractDeployment({
        status: 'deployed',
        txHash: result?.txHash,
        contractAddress: result?.contractAddress
      });
    } catch (error) {
      setContractDeployment({ status: 'failed', txHash: null, contractAddress: null });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-warning bg-warning/10';
      case 'signing': return 'text-primary bg-primary/10';
      case 'signed': return 'text-success bg-success/10';
      case 'failed': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Blockchain Signing Interface</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Sign credentials with institutional private key and deploy smart contracts
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm font-mono text-muted-foreground">Key: 0x1234...5678</span>
            </div>
            <Button
              variant="outline"
              onClick={handleDeployContract}
              iconName="Zap"
              loading={contractDeployment?.status === 'deploying'}
            >
              Deploy Contract
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Signing Queue */}
          <div>
            <h4 className="text-md font-medium text-card-foreground mb-4">Credentials Ready for Signing</h4>
            <div className="space-y-3">
              {signingQueue?.map((credential) => (
                <div
                  key={credential?.id}
                  className={`border border-border rounded-lg p-4 cursor-pointer transition-all ${
                    selectedCredential?.id === credential?.id ? 'border-primary bg-primary/5' : 'hover:border-muted-foreground'
                  }`}
                  onClick={() => setSelectedCredential(credential)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Icon name="FileCheck" size={16} className="text-secondary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-card-foreground">{credential?.studentName}</div>
                        <div className="text-xs text-muted-foreground">{credential?.credentialType}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(credential?.status)}`}>
                        {credential?.status}
                      </span>
                      {credential?.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e?.stopPropagation();
                            handleSignCredential(credential?.id);
                          }}
                          iconName="Pen"
                          loading={signingInProgress}
                        >
                          Sign
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {signingQueue?.length === 0 && (
              <div className="text-center py-8">
                <Icon name="FileCheck" size={32} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">No credentials pending signature</p>
              </div>
            )}
          </div>

          {/* Credential Details & Signing */}
          <div>
            <h4 className="text-md font-medium text-card-foreground mb-4">Credential Details</h4>
            {selectedCredential ? (
              <div className="border border-border rounded-lg p-4">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-card-foreground">Student Information</label>
                    <div className="mt-1 p-3 bg-muted rounded-lg">
                      <div className="text-sm text-card-foreground">{selectedCredential?.studentName}</div>
                      <div className="text-xs text-muted-foreground">ID: {selectedCredential?.studentId}</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground">Credential Type</label>
                    <div className="mt-1 p-3 bg-muted rounded-lg">
                      <div className="text-sm text-card-foreground">{selectedCredential?.credentialType}</div>
                      <div className="text-xs text-muted-foreground">{selectedCredential?.program}</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground">Document Hash</label>
                    <div className="mt-1 p-3 bg-muted rounded-lg">
                      <div className="text-xs font-mono text-muted-foreground break-all">
                        {selectedCredential?.documentHash}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-card-foreground">Metadata</label>
                    <div className="mt-1 p-3 bg-muted rounded-lg">
                      <div className="text-xs text-muted-foreground">
                        Issue Date: {new Date(selectedCredential.issueDate)?.toLocaleDateString()}\n
                        Grade: {selectedCredential?.grade}\n
                        Credits: {selectedCredential?.credits}
                      </div>
                    </div>
                  </div>

                  {selectedCredential?.status === 'pending' && (
                    <Button
                      onClick={() => handleSignCredential(selectedCredential?.id)}
                      loading={signingInProgress}
                      iconName="Pen"
                      className="w-full"
                    >
                      Sign with Institutional Key
                    </Button>
                  )}

                  {selectedCredential?.status === 'signed' && (
                    <div className="p-3 bg-success/10 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" />
                        <span className="text-sm text-success">Successfully signed</span>
                      </div>
                      <div className="text-xs font-mono text-muted-foreground mt-1">
                        TX: {selectedCredential?.txHash}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-border rounded-lg p-8 text-center">
                <Icon name="MousePointer" size={32} className="text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Select a credential to view details</p>
              </div>
            )}
          </div>
        </div>

        {/* Contract Deployment Status */}
        {contractDeployment?.status !== 'idle' && (
          <div className="mt-6 p-4 border border-border rounded-lg">
            <h4 className="text-md font-medium text-card-foreground mb-3">Smart Contract Deployment</h4>
            <div className="space-y-2">
              {contractDeployment?.status === 'deploying' && (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm text-muted-foreground">Deploying smart contract...</span>
                </div>
              )}
              
              {contractDeployment?.status === 'deployed' && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Icon name="Check" size={16} className="text-success" />
                    <span className="text-sm text-success">Contract deployed successfully</span>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    Contract: {contractDeployment?.contractAddress}
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    TX Hash: {contractDeployment?.txHash}
                  </div>
                </div>
              )}
              
              {contractDeployment?.status === 'failed' && (
                <div className="flex items-center space-x-2">
                  <Icon name="X" size={16} className="text-error" />
                  <span className="text-sm text-error">Contract deployment failed</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainSigningInterface;