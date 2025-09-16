import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const DocumentIntegrityChecker = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [integrityResult, setIntegrityResult] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setIntegrityResult(null);
  };

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === 'dragenter' || e?.type === 'dragover') {
      setDragActive(true);
    } else if (e?.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      handleFileSelect(e?.dataTransfer?.files?.[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFileSelect(e?.target?.files?.[0]);
    }
  };

  const checkIntegrity = () => {
    if (!selectedFile) return;
    
    setIsChecking(true);
    
    // Mock integrity check process
    setTimeout(() => {
      const mockResults = [
        {
          status: 'verified',
          originalHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
          currentHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
          match: true,
          lastModified: '2024-05-15T10:30:00Z',
          blockchainRecord: '0x9876543210abcdef1234567890abcdef12345678',
          ipfsHash: 'QmX1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9',
          fileSize: '2.4 MB',
          modifications: []
        },
        {
          status: 'tampered',
          originalHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12',
          currentHash: '0x2b3c4d5e6f7890abcdef1234567890abcdef1234',
          match: false,
          lastModified: '2024-08-20T14:45:00Z',
          blockchainRecord: '0x9876543210abcdef1234567890abcdef12345678',
          ipfsHash: 'QmX1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9',
          fileSize: '2.6 MB',
          modifications: [
            { type: 'content', description: 'Text content modified', timestamp: '2024-08-20T14:45:00Z' },
            { type: 'metadata', description: 'File properties changed', timestamp: '2024-08-20T14:45:00Z' }
          ]
        }
      ];
      
      // Randomly select a result for demo
      const result = mockResults?.[Math.random() > 0.7 ? 1 : 0];
      setIntegrityResult(result);
      setIsChecking(false);
    }, 3000);
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp)?.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="FileCheck" size={20} className="text-warning" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Document Integrity Checker</h2>
          <p className="text-sm text-muted-foreground">Verify document authenticity against blockchain records</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* File Upload Area */}
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            dragActive 
              ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {selectedFile ? (
            <div className="space-y-3">
              <Icon name="FileText" size={48} className="text-primary mx-auto" />
              <div>
                <p className="font-medium text-foreground">{selectedFile?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(selectedFile?.size / (1024 * 1024))?.toFixed(2)} MB
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedFile(null)}
                iconName="X"
              >
                Remove File
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Icon name="Upload" size={48} className="text-muted-foreground mx-auto" />
              <div>
                <p className="text-lg font-medium text-foreground">Drop your document here</p>
                <p className="text-sm text-muted-foreground">or click to browse files</p>
              </div>
              <input
                type="file"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" iconName="FolderOpen" asChild>
                  <span>Browse Files</span>
                </Button>
              </label>
            </div>
          )}
        </div>

        {/* Hash Input Alternative */}
        <div className="border-t border-border pt-6">
          <h3 className="font-medium text-foreground mb-3">Or verify by document hash</h3>
          <div className="flex space-x-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Enter document hash (SHA-256)"
                className="font-mono"
              />
            </div>
            <Button variant="outline" iconName="Hash">
              Verify Hash
            </Button>
          </div>
        </div>

        {/* Check Button */}
        {selectedFile && (
          <Button
            variant="default"
            onClick={checkIntegrity}
            loading={isChecking}
            iconName="Shield"
            fullWidth
            className="py-3"
          >
            {isChecking ? 'Checking Integrity...' : 'Check Document Integrity'}
          </Button>
        )}

        {/* Results */}
        {integrityResult && (
          <div className={`p-6 rounded-lg border ${
            integrityResult?.match 
              ? 'bg-success/5 border-success/20' :'bg-error/5 border-error/20'
          }`}>
            <div className="flex items-center space-x-3 mb-4">
              <Icon 
                name={integrityResult?.match ? 'CheckCircle' : 'XCircle'} 
                size={24} 
                className={integrityResult?.match ? 'text-success' : 'text-error'} 
              />
              <div>
                <h3 className={`text-lg font-semibold ${
                  integrityResult?.match ? 'text-success' : 'text-error'
                }`}>
                  {integrityResult?.match ? 'Document Verified' : 'Document Tampered'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {integrityResult?.match 
                    ? 'Document matches blockchain record exactly' :'Document has been modified since blockchain storage'
                  }
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Original Hash</label>
                <p className="text-sm font-mono text-foreground break-all">{integrityResult?.originalHash}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Current Hash</label>
                <p className={`text-sm font-mono break-all ${
                  integrityResult?.match ? 'text-foreground' : 'text-error'
                }`}>
                  {integrityResult?.currentHash}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">File Size</label>
                <p className="text-sm text-foreground">{integrityResult?.fileSize}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Last Modified</label>
                <p className="text-sm text-foreground">{formatTimestamp(integrityResult?.lastModified)}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Blockchain Record</label>
                <p className="text-sm font-mono text-foreground break-all">{integrityResult?.blockchainRecord}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">IPFS Hash</label>
                <p className="text-sm font-mono text-foreground break-all">{integrityResult?.ipfsHash}</p>
              </div>
            </div>

            {!integrityResult?.match && integrityResult?.modifications?.length > 0 && (
              <div className="border-t border-error/20 pt-4">
                <h4 className="font-medium text-error mb-3">Detected Modifications</h4>
                <div className="space-y-2">
                  {integrityResult?.modifications?.map((mod, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-error/5 rounded-lg">
                      <Icon name="AlertTriangle" size={16} className="text-error" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-error capitalize">{mod?.type} Modification</p>
                        <p className="text-xs text-muted-foreground">{mod?.description}</p>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(mod?.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex space-x-3 mt-4">
              <Button variant="outline" size="sm" iconName="Download">
                Download Report
              </Button>
              <Button variant="outline" size="sm" iconName="Share">
                Share Results
              </Button>
              {!integrityResult?.match && (
                <Button variant="destructive" size="sm" iconName="Flag">
                  Report Fraud
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentIntegrityChecker;