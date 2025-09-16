import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationStatus = () => {
  const [selectedCredential, setSelectedCredential] = useState(null);

  const verificationStatuses = [
    {
      id: 1,
      credentialId: 'CRED-2024-001234',
      studentName: 'Sarah Johnson',
      institution: 'MIT',
      degree: 'Bachelor of Computer Science',
      status: 'verified',
      trustScore: 98,
      lastVerified: '2024-08-28T14:30:00Z',
      verificationCount: 47,
      institutionReputation: 95,
      fraudAlerts: 0,
      blockchainConfirmations: 1247,
      ipfsHash: 'QmX1Y2Z3A4B5C6D7E8F9G0H1I2J3K4L5M6N7O8P9Q0R1S2T3U4V5W6X7Y8Z9'
    },
    {
      id: 2,
      credentialId: 'CRED-2024-001235',
      studentName: 'Michael Chen',
      institution: 'Stanford University',
      degree: 'Master of Business Administration',
      status: 'pending',
      trustScore: 85,
      lastVerified: '2024-08-27T16:20:00Z',
      verificationCount: 23,
      institutionReputation: 97,
      fraudAlerts: 0,
      blockchainConfirmations: 892,
      ipfsHash: 'QmA1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6A7B8C9D0'
    },
    {
      id: 3,
      credentialId: 'CRED-2024-001236',
      studentName: 'Emily Rodriguez',
      institution: 'Harvard University',
      degree: 'Doctor of Philosophy in Physics',
      status: 'flagged',
      trustScore: 72,
      lastVerified: '2024-08-26T09:15:00Z',
      verificationCount: 12,
      institutionReputation: 99,
      fraudAlerts: 2,
      blockchainConfirmations: 456,
      ipfsHash: 'QmZ9Y8X7W6V5U4T3S2R1Q0P9O8N7M6L5K4J3I2H1G0F9E8D7C6B5A4Z3Y2X1W0V9'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'flagged': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'flagged': return 'AlertTriangle';
      default: return 'HelpCircle';
    }
  };

  const getTrustScoreColor = (score) => {
    if (score >= 90) return 'text-success';
    if (score >= 70) return 'text-warning';
    return 'text-error';
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
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Verification Status</h2>
            <p className="text-sm text-muted-foreground">Real-time credential verification monitoring</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          {verificationStatuses?.map((credential) => (
            <div
              key={credential?.id}
              className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => setSelectedCredential(selectedCredential === credential?.id ? null : credential?.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(credential?.status)}`}>
                      <Icon name={getStatusIcon(credential?.status)} size={14} />
                      <span className="capitalize">{credential?.status}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-foreground">{credential?.studentName}</h3>
                    <p className="text-sm text-muted-foreground">{credential?.institution} • {credential?.degree}</p>
                    <p className="text-xs font-mono text-muted-foreground mt-1">{credential?.credentialId}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getTrustScoreColor(credential?.trustScore)}`}>
                      {credential?.trustScore}%
                    </div>
                    <div className="text-xs text-muted-foreground">Trust Score</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">{credential?.verificationCount}</div>
                    <div className="text-xs text-muted-foreground">Verifications</div>
                  </div>

                  {credential?.fraudAlerts > 0 && (
                    <div className="text-center">
                      <div className="text-lg font-semibold text-error">{credential?.fraudAlerts}</div>
                      <div className="text-xs text-muted-foreground">Alerts</div>
                    </div>
                  )}

                  <Icon 
                    name={selectedCredential === credential?.id ? 'ChevronUp' : 'ChevronDown'} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                </div>
              </div>

              {selectedCredential === credential?.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Institution Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Reputation Score:</span>
                          <span className="text-sm font-medium text-success">{credential?.institutionReputation}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Last Verified:</span>
                          <span className="text-sm text-foreground">{formatTimestamp(credential?.lastVerified)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Blockchain Details</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Confirmations:</span>
                          <span className="text-sm font-medium text-foreground">{credential?.blockchainConfirmations?.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-sm text-muted-foreground">IPFS Hash:</span>
                          <p className="text-xs font-mono text-foreground break-all mt-1">
                            {credential?.ipfsHash?.substring(0, 20)}...{credential?.ipfsHash?.substring(credential?.ipfsHash?.length - 10)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground">Actions</h4>
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" iconName="Eye" fullWidth>
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" iconName="Download" fullWidth>
                          Export Report
                        </Button>
                        {credential?.status === 'flagged' && (
                          <Button variant="destructive" size="sm" iconName="Flag" fullWidth>
                            Investigate
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerificationStatus;