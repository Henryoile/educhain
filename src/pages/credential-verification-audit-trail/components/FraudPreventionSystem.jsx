import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FraudPreventionSystem = () => {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const fraudAlerts = [
    {
      id: 1,
      type: 'duplicate_credential',
      severity: 'critical',
      title: 'Duplicate Credential Detected',
      description: 'Same credential hash found across multiple student profiles',
      timestamp: '2024-08-28T15:45:00Z',
      credentialId: 'CRED-2024-001237',
      affectedStudents: ['John Doe', 'Jane Smith'],
      institution: 'University of California',
      riskScore: 95,
      status: 'investigating',
      evidence: [
        'Identical document hash: 0x1a2b3c4d...',
        'Same IPFS content identifier',
        'Uploaded within 24 hours of each other'
      ],
      recommendedActions: [
        'Contact both students for verification',
        'Review institution issuance process',
        'Temporarily suspend credential verification'
      ]
    },
    {
      id: 2,
      type: 'suspicious_verification',
      severity: 'high',
      title: 'Unusual Verification Pattern',
      description: 'Multiple verification requests from same IP in short timeframe',
      timestamp: '2024-08-28T14:20:00Z',
      credentialId: 'CRED-2024-001238',
      affectedStudents: ['Michael Johnson'],
      institution: 'MIT',
      riskScore: 78,
      status: 'monitoring',
      evidence: [
        '47 verification requests in 2 hours',
        'All from IP: 192.168.1.100',
        'Different employer accounts used'
      ],
      recommendedActions: [
        'Rate limit verification requests',
        'Verify employer account authenticity',
        'Monitor for bot activity'
      ]
    },
    {
      id: 3,
      type: 'institution_anomaly',
      severity: 'medium',
      title: 'Institution Verification Anomaly',
      description: 'Credential issued by unverified institution branch',
      timestamp: '2024-08-28T12:10:00Z',
      credentialId: 'CRED-2024-001239',
      affectedStudents: ['Sarah Wilson'],
      institution: 'Harvard Extension School',
      riskScore: 65,
      status: 'resolved',
      evidence: [
        'Institution branch not in verified registry',
        'Signing key not recognized',
        'Domain verification failed'
      ],
      recommendedActions: [
        'Verify institution branch legitimacy',
        'Update institution registry',
        'Re-validate signing keys'
      ]
    },
    {
      id: 4,
      type: 'document_tampering',
      severity: 'high',
      title: 'Document Tampering Detected',
      description: 'Original document modified after blockchain storage',
      timestamp: '2024-08-28T10:30:00Z',
      credentialId: 'CRED-2024-001240',
      affectedStudents: ['Robert Brown'],
      institution: 'Stanford University',
      riskScore: 88,
      status: 'flagged',
      evidence: [
        'Hash mismatch detected',
        'File size increased by 15%',
        'Metadata timestamps altered'
      ],
      recommendedActions: [
        'Freeze credential verification',
        'Request original document from institution',
        'Investigate modification source'
      ]
    }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-error bg-error/10 border-error/20';
      case 'high': return 'text-warning bg-warning/10 border-warning/20';
      case 'medium': return 'text-accent bg-accent/10 border-accent/20';
      case 'low': return 'text-muted-foreground bg-muted/10 border-border';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'AlertCircle';
      case 'medium': return 'Info';
      case 'low': return 'HelpCircle';
      default: return 'HelpCircle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'investigating': return 'text-warning bg-warning/10';
      case 'monitoring': return 'text-primary bg-primary/10';
      case 'resolved': return 'text-success bg-success/10';
      case 'flagged': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'duplicate_credential': return 'Copy';
      case 'suspicious_verification': return 'Eye';
      case 'institution_anomaly': return 'Building2';
      case 'document_tampering': return 'FileX';
      default: return 'AlertTriangle';
    }
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

  const filteredAlerts = fraudAlerts?.filter(alert => 
    filterSeverity === 'all' || alert?.severity === filterSeverity
  );

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-error" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Fraud Prevention System</h2>
              <p className="text-sm text-muted-foreground">Real-time fraud detection and alerts</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 px-3 py-2 bg-error/5 rounded-lg">
              <div className="w-2 h-2 bg-error rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-error">{filteredAlerts?.length} Active Alerts</span>
            </div>
            <Button variant="outline" size="sm" iconName="Settings">
              Configure
            </Button>
          </div>
        </div>

        <Select
          options={severityOptions}
          value={filterSeverity}
          onChange={setFilterSeverity}
          className="w-48"
        />
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {filteredAlerts?.map((alert) => (
            <div
              key={alert?.id}
              className="border border-border rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => setSelectedAlert(selectedAlert === alert?.id ? null : alert?.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Icon name={getTypeIcon(alert?.type)} size={20} className="text-muted-foreground" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-medium text-foreground">{alert?.title}</h3>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(alert?.severity)}`}>
                        <Icon name={getSeverityIcon(alert?.severity)} size={12} />
                        <span className="capitalize">{alert?.severity}</span>
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(alert?.status)}`}>
                        <span className="capitalize">{alert?.status}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">{alert?.description}</p>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{formatTimestamp(alert?.timestamp)}</span>
                      <span>•</span>
                      <span>{alert?.institution}</span>
                      <span>•</span>
                      <span className="font-mono">{alert?.credentialId}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${
                      alert?.riskScore >= 80 ? 'text-error' : 
                      alert?.riskScore >= 60 ? 'text-warning' : 'text-success'
                    }`}>
                      {alert?.riskScore}
                    </div>
                    <div className="text-xs text-muted-foreground">Risk Score</div>
                  </div>
                  
                  <Icon 
                    name={selectedAlert === alert?.id ? 'ChevronUp' : 'ChevronDown'} 
                    size={20} 
                    className="text-muted-foreground" 
                  />
                </div>
              </div>

              {selectedAlert === alert?.id && (
                <div className="mt-4 pt-4 border-t border-border">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <h4 className="font-medium text-foreground mb-3">Affected Students</h4>
                      <div className="space-y-2">
                        {alert?.affectedStudents?.map((student, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-muted/30 rounded">
                            <Icon name="User" size={16} className="text-muted-foreground" />
                            <span className="text-sm text-foreground">{student}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-3">Evidence</h4>
                      <div className="space-y-2">
                        {alert?.evidence?.map((evidence, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Icon name="Dot" size={16} className="text-muted-foreground mt-0.5" />
                            <span className="text-sm text-muted-foreground">{evidence}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-3">Recommended Actions</h4>
                      <div className="space-y-2">
                        {alert?.recommendedActions?.map((action, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Icon name="ArrowRight" size={16} className="text-primary mt-0.5" />
                            <span className="text-sm text-foreground">{action}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-3 mt-6">
                    <Button variant="default" size="sm" iconName="Eye">
                      Investigate
                    </Button>
                    <Button variant="outline" size="sm" iconName="CheckCircle">
                      Mark Resolved
                    </Button>
                    <Button variant="outline" size="sm" iconName="Flag">
                      Escalate
                    </Button>
                    <Button variant="outline" size="sm" iconName="Download">
                      Export Report
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredAlerts?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Shield" size={48} className="text-success mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No Fraud Alerts</h3>
            <p className="text-muted-foreground">All credentials are secure and verified</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FraudPreventionSystem;