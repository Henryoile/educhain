import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QRScanner = ({ isOpen, onClose, onScanResult }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);

  const handleStartScan = () => {
    setIsScanning(true);
    // Simulate QR code scanning
    setTimeout(() => {
      const mockScanResult = {
        candidateId: 'cand_123456',
        name: 'Sarah Johnson',
        credentials: [
          {
            id: 'cred_001',
            title: 'Bachelor of Computer Science',
            institution: 'MIT',
            verified: true,
            blockchainHash: '0xabc123...def456'
          },
          {
            id: 'cred_002',
            title: 'AWS Solutions Architect',
            institution: 'Amazon Web Services',
            verified: true,
            blockchainHash: '0x789xyz...123abc'
          }
        ],
        verificationStatus: 'verified',
        lastUpdated: '2025-08-28T10:30:00Z'
      };
      
      setScanResult(mockScanResult);
      setIsScanning(false);
      onScanResult(mockScanResult);
    }, 3000);
  };

  const handleClose = () => {
    setIsScanning(false);
    setScanResult(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="QrCode" size={20} color="white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">QR Code Scanner</h3>
              <p className="text-sm text-muted-foreground">Verify credentials instantly</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            iconName="X"
          />
        </div>

        {/* Scanner Content */}
        <div className="p-6">
          {!isScanning && !scanResult && (
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto bg-muted rounded-lg flex items-center justify-center">
                <Icon name="QrCode" size={48} className="text-muted-foreground" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Ready to Scan</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Position the QR code within the camera frame to verify candidate credentials
                </p>
              </div>
              <Button
                variant="default"
                onClick={handleStartScan}
                iconName="Camera"
                iconPosition="left"
                fullWidth
              >
                Start Scanning
              </Button>
            </div>
          )}

          {isScanning && (
            <div className="text-center space-y-4">
              <div className="w-32 h-32 mx-auto bg-primary/10 rounded-lg flex items-center justify-center relative">
                <Icon name="QrCode" size={48} className="text-primary" />
                <div className="absolute inset-0 border-2 border-primary rounded-lg animate-pulse"></div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Scanning...</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Hold steady while we verify the blockchain credentials
                </p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => setIsScanning(false)}
                fullWidth
              >
                Cancel Scan
              </Button>
            </div>
          )}

          {scanResult && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto bg-success rounded-full flex items-center justify-center mb-3">
                  <Icon name="CheckCircle" size={24} color="white" />
                </div>
                <h4 className="font-semibold text-foreground mb-1">Verification Complete</h4>
                <p className="text-sm text-muted-foreground">Credentials successfully verified on blockchain</p>
              </div>

              {/* Candidate Info */}
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-foreground">{scanResult?.name}</h5>
                    <p className="text-sm text-muted-foreground">ID: {scanResult?.candidateId}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center space-x-1 text-success">
                      <Icon name="Shield" size={16} />
                      <span className="text-sm font-medium">Verified</span>
                    </div>
                  </div>
                </div>

                {/* Credentials */}
                <div className="space-y-2">
                  <h6 className="text-sm font-medium text-foreground">Verified Credentials:</h6>
                  {scanResult?.credentials?.map((credential, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div>
                        <div className="font-medium text-foreground">{credential?.title}</div>
                        <div className="text-muted-foreground">{credential?.institution}</div>
                      </div>
                      <div className="flex items-center space-x-1 text-success">
                        <Icon name="Shield" size={12} />
                        <span className="text-xs">Verified</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Blockchain Info */}
                <div className="mt-3 pt-3 border-t border-border">
                  <div className="text-xs text-muted-foreground">
                    <div>Last verified: {new Date(scanResult.lastUpdated)?.toLocaleDateString()}</div>
                    <div className="font-mono">Hash: {scanResult?.credentials?.[0]?.blockchainHash}</div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setScanResult(null)}
                  iconName="RotateCcw"
                  iconPosition="left"
                  fullWidth
                >
                  Scan Another
                </Button>
                <Button
                  variant="default"
                  onClick={handleClose}
                  iconName="Check"
                  iconPosition="left"
                  fullWidth
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRScanner;