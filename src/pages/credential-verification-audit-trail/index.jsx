import React, { useState } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import VerificationLookup from './components/VerificationLookup';
import AuditTrailTable from './components/AuditTrailTable';
import VerificationStatus from './components/VerificationStatus';
import DocumentIntegrityChecker from './components/DocumentIntegrityChecker';
import FraudPreventionSystem from './components/FraudPreventionSystem';
import BlockchainMonitor from './components/BlockchainMonitor';
import BatchVerificationTool from './components/BatchVerificationTool';

const CredentialVerificationAuditTrail = () => {
  const [activeTab, setActiveTab] = useState('lookup');

  const tabs = [
    { id: 'lookup', label: 'Credential Lookup', icon: 'Search' },
    { id: 'audit', label: 'Audit Trail', icon: 'History' },
    { id: 'status', label: 'Verification Status', icon: 'Shield' },
    { id: 'integrity', label: 'Document Integrity', icon: 'FileCheck' },
    { id: 'fraud', label: 'Fraud Prevention', icon: 'AlertTriangle' },
    { id: 'blockchain', label: 'Blockchain Monitor', icon: 'Activity' },
    { id: 'batch', label: 'Batch Verification', icon: 'Layers' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'lookup':
        return <VerificationLookup />;
      case 'audit':
        return <AuditTrailTable />;
      case 'status':
        return <VerificationStatus />;
      case 'integrity':
        return <DocumentIntegrityChecker />;
      case 'fraud':
        return <FraudPreventionSystem />;
      case 'blockchain':
        return <BlockchainMonitor />;
      case 'batch':
        return <BatchVerificationTool />;
      default:
        return <VerificationLookup />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-foreground">Credential Verification & Audit Trail</h1>
                  <p className="text-muted-foreground mt-1">
                    Comprehensive verification tools and transparent audit trails for credential authenticity
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-success/10 rounded-lg">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-success">Network Connected</span>
                </div>
                <Button variant="outline" iconName="Settings">
                  Settings
                </Button>
                <Button variant="default" iconName="Plus">
                  New Verification
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="bg-surface border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-2">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </div>
      {/* Quick Actions Floating Panel */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className="bg-surface border border-border rounded-lg shadow-modal p-4">
          <h3 className="font-medium text-foreground mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="outline" size="sm" iconName="QrCode" fullWidth>
              QR Scan
            </Button>
            <Button variant="outline" size="sm" iconName="Upload" fullWidth>
              Upload Document
            </Button>
            <Button variant="outline" size="sm" iconName="Search" fullWidth>
              Quick Lookup
            </Button>
          </div>
        </div>
      </div>
      {/* Global Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface border-t border-border z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-muted-foreground">1,247 Verified Today</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-muted-foreground">3 Pending Verifications</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-error rounded-full"></div>
                <span className="text-muted-foreground">2 Fraud Alerts</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>Network: Ethereum Mainnet</span>
              <span>•</span>
              <span>Gas: 25 Gwei</span>
              <span>•</span>
              <span>Block: #18,542,367</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CredentialVerificationAuditTrail;