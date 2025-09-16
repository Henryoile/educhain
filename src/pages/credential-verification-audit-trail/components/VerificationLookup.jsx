import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const VerificationLookup = () => {
  const [lookupType, setLookupType] = useState('hash');
  const [searchValue, setSearchValue] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);

  const lookupOptions = [
    { value: 'hash', label: 'Document Hash' },
    { value: 'credential', label: 'Credential ID' },
    { value: 'student', label: 'Student ID' },
    { value: 'institution', label: 'Institution Code' }
  ];

  const handleVerification = () => {
    // Mock verification process
    setTimeout(() => {
      setVerificationResult({
        status: 'verified',
        credentialId: 'CRED-2024-001234',
        studentName: 'Sarah Johnson',
        institution: 'MIT',
        degree: 'Bachelor of Computer Science',
        issueDate: '2024-05-15',
        blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890',
        trustScore: 98,
        verificationCount: 47
      });
    }, 2000);
  };

  const handleQRScan = () => {
    setIsScanning(true);
    // Mock QR scan process
    setTimeout(() => {
      setSearchValue('0x1a2b3c4d5e6f7890abcdef1234567890');
      setIsScanning(false);
      handleVerification();
    }, 3000);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Search" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-foreground">Credential Lookup</h2>
          <p className="text-sm text-muted-foreground">Verify credential authenticity instantly</p>
        </div>
      </div>
      <div className="space-y-4">
        <Select
          label="Lookup Type"
          options={lookupOptions}
          value={lookupType}
          onChange={setLookupType}
          className="mb-4"
        />

        <div className="flex space-x-3">
          <div className="flex-1">
            <Input
              label="Search Value"
              type="text"
              placeholder={`Enter ${lookupOptions?.find(opt => opt?.value === lookupType)?.label?.toLowerCase()}`}
              value={searchValue}
              onChange={(e) => setSearchValue(e?.target?.value)}
            />
          </div>
          <div className="flex items-end space-x-2">
            <Button
              variant="outline"
              onClick={handleQRScan}
              iconName="QrCode"
              disabled={isScanning}
              loading={isScanning}
            >
              {isScanning ? 'Scanning...' : 'QR Scan'}
            </Button>
            <Button
              variant="default"
              onClick={handleVerification}
              iconName="Shield"
              disabled={!searchValue}
            >
              Verify
            </Button>
          </div>
        </div>

        {verificationResult && (
          <div className="mt-6 p-4 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={20} className="text-success" />
                <span className="font-medium text-success">Credential Verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Trust Score:</span>
                <span className="font-semibold text-success">{verificationResult?.trustScore}%</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Student Name</label>
                <p className="text-foreground">{verificationResult?.studentName}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Institution</label>
                <p className="text-foreground">{verificationResult?.institution}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Degree</label>
                <p className="text-foreground">{verificationResult?.degree}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Issue Date</label>
                <p className="text-foreground">{verificationResult?.issueDate}</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium text-muted-foreground">Blockchain Hash</label>
                <p className="text-foreground font-mono text-sm break-all">{verificationResult?.blockchainHash}</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className="text-sm text-muted-foreground">
                Verified {verificationResult?.verificationCount} times
              </span>
              <Button variant="outline" size="sm" iconName="Download">
                Export Report
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationLookup;