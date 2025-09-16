import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const BatchVerificationTool = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [verificationResults, setVerificationResults] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [verificationMode, setVerificationMode] = useState('standard');

  const verificationModeOptions = [
    { value: 'standard', label: 'Standard Verification' },
    { value: 'deep', label: 'Deep Verification' },
    { value: 'quick', label: 'Quick Check' }
  ];

  const mockCredentials = [
    {
      id: 1,
      fileName: 'credentials_batch_1.csv',
      credentialId: 'CRED-2024-001234',
      studentName: 'Sarah Johnson',
      institution: 'MIT',
      degree: 'Bachelor of Computer Science',
      status: 'verified',
      trustScore: 98,
      verificationTime: '2.3s',
      issues: []
    },
    {
      id: 2,
      fileName: 'credentials_batch_1.csv',
      credentialId: 'CRED-2024-001235',
      studentName: 'Michael Chen',
      institution: 'Stanford University',
      degree: 'Master of Business Administration',
      status: 'verified',
      trustScore: 95,
      verificationTime: '1.8s',
      issues: []
    },
    {
      id: 3,
      fileName: 'credentials_batch_1.csv',
      credentialId: 'CRED-2024-001236',
      studentName: 'Emily Rodriguez',
      institution: 'Harvard University',
      degree: 'Doctor of Philosophy in Physics',
      status: 'flagged',
      trustScore: 72,
      verificationTime: '3.1s',
      issues: ['Institution signature mismatch', 'Unusual verification pattern']
    },
    {
      id: 4,
      fileName: 'credentials_batch_1.csv',
      credentialId: 'CRED-2024-001237',
      studentName: 'Robert Brown',
      institution: 'University of California',
      degree: 'Bachelor of Engineering',
      status: 'failed',
      trustScore: 45,
      verificationTime: '2.7s',
      issues: ['Document hash not found', 'Institution not verified', 'Potential fraud detected']
    }
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e?.target?.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleDragOver = (e) => {
    e?.preventDefault();
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    const files = Array.from(e?.dataTransfer?.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setUploadedFiles(prev => prev?.filter((_, i) => i !== index));
  };

  const startBatchVerification = () => {
    if (uploadedFiles?.length === 0) return;
    
    setIsProcessing(true);
    setProcessingProgress(0);
    setVerificationResults([]);

    // Simulate batch processing
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        const newProgress = prev + 25;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          setVerificationResults(mockCredentials);
          return 100;
        }
        return newProgress;
      });
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success/10 border-success/20';
      case 'flagged': return 'text-warning bg-warning/10 border-warning/20';
      case 'failed': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'flagged': return 'AlertTriangle';
      case 'failed': return 'XCircle';
      default: return 'HelpCircle';
    }
  };

  const getTrustScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
  };

  const exportResults = (format) => {
    // Mock export functionality
    console.log(`Exporting results as ${format}`);
  };

  const verifiedCount = verificationResults?.filter(r => r?.status === 'verified')?.length;
  const flaggedCount = verificationResults?.filter(r => r?.status === 'flagged')?.length;
  const failedCount = verificationResults?.filter(r => r?.status === 'failed')?.length;

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Layers" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Batch Verification Tool</h2>
            <p className="text-sm text-muted-foreground">Process multiple credentials simultaneously</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Verification Mode"
            options={verificationModeOptions}
            value={verificationMode}
            onChange={setVerificationMode}
          />
          
          <div className="flex items-end">
            <Button
              variant="default"
              onClick={startBatchVerification}
              disabled={uploadedFiles?.length === 0 || isProcessing}
              loading={isProcessing}
              iconName="Play"
              fullWidth
            >
              {isProcessing ? 'Processing...' : 'Start Verification'}
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* File Upload Area */}
        <div className="mb-6">
          <h3 className="font-medium text-foreground mb-3">Upload Credential Files</h3>
          <div
            className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium mb-2">Drop CSV, Excel, or JSON files here</p>
            <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
            <input
              type="file"
              multiple
              accept=".csv,.xlsx,.xls,.json"
              onChange={handleFileUpload}
              className="hidden"
              id="batch-file-upload"
            />
            <label htmlFor="batch-file-upload">
              <Button variant="outline" iconName="FolderOpen" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium text-foreground mb-2">Uploaded Files ({uploadedFiles?.length})</h4>
              <div className="space-y-2">
                {uploadedFiles?.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="FileText" size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{file?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(file?.size / 1024)?.toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(index)}
                      iconName="X"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Processing Progress */}
        {isProcessing && (
          <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Processing Credentials...</span>
              <span className="text-sm text-primary">{processingProgress}%</span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${processingProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Results Summary */}
        {verificationResults?.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground">Verification Results</h3>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => exportResults('csv')} iconName="Download">
                  Export CSV
                </Button>
                <Button variant="outline" size="sm" onClick={() => exportResults('excel')} iconName="FileSpreadsheet">
                  Export Excel
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <div className="text-2xl font-bold text-foreground">{verificationResults?.length}</div>
                <div className="text-sm text-muted-foreground">Total Processed</div>
              </div>
              <div className="text-center p-4 bg-success/10 rounded-lg">
                <div className="text-2xl font-bold text-success">{verifiedCount}</div>
                <div className="text-sm text-muted-foreground">Verified</div>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-lg">
                <div className="text-2xl font-bold text-warning">{flaggedCount}</div>
                <div className="text-sm text-muted-foreground">Flagged</div>
              </div>
              <div className="text-center p-4 bg-error/10 rounded-lg">
                <div className="text-2xl font-bold text-error">{failedCount}</div>
                <div className="text-sm text-muted-foreground">Failed</div>
              </div>
            </div>

            {/* Results Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-border rounded-lg">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-medium text-muted-foreground">Student</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Institution</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Credential ID</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Trust Score</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Time</th>
                    <th className="text-left p-3 font-medium text-muted-foreground">Issues</th>
                  </tr>
                </thead>
                <tbody>
                  {verificationResults?.map((result) => (
                    <tr key={result?.id} className="border-t border-border hover:bg-muted/30">
                      <td className="p-3">
                        <div>
                          <p className="font-medium text-foreground">{result?.studentName}</p>
                          <p className="text-sm text-muted-foreground">{result?.degree}</p>
                        </div>
                      </td>
                      <td className="p-3 text-foreground">{result?.institution}</td>
                      <td className="p-3 font-mono text-sm text-foreground">{result?.credentialId}</td>
                      <td className="p-3">
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(result?.status)}`}>
                          <Icon name={getStatusIcon(result?.status)} size={12} />
                          <span className="capitalize">{result?.status}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`font-bold ${getTrustScoreColor(result?.trustScore)}`}>
                          {result?.trustScore}%
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground">{result?.verificationTime}</td>
                      <td className="p-3">
                        {result?.issues?.length > 0 ? (
                          <div className="space-y-1">
                            {result?.issues?.slice(0, 2)?.map((issue, index) => (
                              <div key={index} className="text-xs text-error bg-error/10 px-2 py-1 rounded">
                                {issue}
                              </div>
                            ))}
                            {result?.issues?.length > 2 && (
                              <div className="text-xs text-muted-foreground">
                                +{result?.issues?.length - 2} more
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-success">No issues</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BatchVerificationTool;