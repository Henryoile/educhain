import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import PendingRequestsTable from './components/PendingRequestsTable';
import CredentialTemplates from './components/CredentialTemplates';
import BlockchainSigningInterface from './components/BlockchainSigningInterface';
import AlumniMetrics from './components/AlumniMetrics';
import VerificationQueue from './components/VerificationQueue';
import QuickActions from './components/QuickActions';

const InstitutionDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for pending requests
  const pendingRequests = [
    {
      id: 'req_001',
      submissionDate: new Date(Date.now() - 86400000),
      studentName: 'Alice Johnson',
      studentId: 'STU2024001',
      credentialType: 'Bachelor of Science',
      program: 'Computer Science',
      priority: 'high'
    },
    {
      id: 'req_002',
      submissionDate: new Date(Date.now() - 172800000),
      studentName: 'Michael Chen',
      studentId: 'STU2024002',
      credentialType: 'Master of Arts',
      program: 'Digital Marketing',
      priority: 'medium'
    },
    {
      id: 'req_003',
      submissionDate: new Date(Date.now() - 259200000),
      studentName: 'Sarah Williams',
      studentId: 'STU2024003',
      credentialType: 'Certificate',
      program: 'Data Analytics',
      priority: 'low'
    },
    {
      id: 'req_004',
      submissionDate: new Date(Date.now() - 345600000),
      studentName: 'David Rodriguez',
      studentId: 'STU2024004',
      credentialType: 'Diploma',
      program: 'Web Development',
      priority: 'high'
    }
  ];

  // Mock data for credential templates
  const credentialTemplates = [
    {
      id: 'tpl_001',
      name: 'Bachelor of Science',
      type: 'degree',
      description: 'Standard undergraduate degree template with GPA and honors recognition',
      usageCount: 245,
      lastModified: new Date(Date.now() - 604800000)
    },
    {
      id: 'tpl_002',
      name: 'Master of Arts',
      type: 'degree',
      description: 'Graduate degree template with thesis title and research focus',
      usageCount: 89,
      lastModified: new Date(Date.now() - 1209600000)
    },
    {
      id: 'tpl_003',
      name: 'Professional Certificate',
      type: 'certificate',
      description: 'Industry certification template with skill validation',
      usageCount: 156,
      lastModified: new Date(Date.now() - 432000000)
    }
  ];

  // Mock data for blockchain signing queue
  const signingQueue = [
    {
      id: 'sign_001',
      studentName: 'Emma Thompson',
      studentId: 'STU2024005',
      credentialType: 'Bachelor of Arts',
      program: 'Psychology',
      status: 'pending',
      documentHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
      issueDate: new Date(),
      grade: 'Magna Cum Laude',
      credits: '120'
    },
    {
      id: 'sign_002',
      studentName: 'James Wilson',
      studentId: 'STU2024006',
      credentialType: 'Master of Science',
      program: 'Data Science',
      status: 'signed',
      documentHash: '0x9876543210fedcba0987654321fedcba0987654321fedcba0987654321fedcba',
      issueDate: new Date(Date.now() - 86400000),
      grade: 'Distinction',
      credits: '60',
      txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890'
    }
  ];

  // Mock data for verification queue
  const verificationQueue = [
    {
      id: 'vq_001',
      studentName: 'Lisa Anderson',
      credentialType: 'Bachelor of Engineering',
      program: 'Mechanical Engineering',
      priority: 'high',
      complexity: 'moderate',
      submissionDate: new Date(Date.now() - 43200000),
      status: 'pending',
      assignedTo: null,
      isUrgent: true,
      progress: 0
    },
    {
      id: 'vq_002',
      studentName: 'Robert Taylor',
      credentialType: 'Master of Business Administration',
      program: 'Finance',
      priority: 'medium',
      complexity: 'complex',
      submissionDate: new Date(Date.now() - 86400000),
      status: 'in_progress',
      assignedTo: 'john_doe',
      isUrgent: false,
      progress: 65
    },
    {
      id: 'vq_003',
      studentName: 'Maria Garcia',
      credentialType: 'Certificate',
      program: 'Project Management',
      priority: 'low',
      complexity: 'simple',
      submissionDate: new Date(Date.now() - 172800000),
      status: 'pending',
      assignedTo: 'jane_smith',
      isUrgent: false,
      progress: 0
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'requests', label: 'Pending Requests', icon: 'FileCheck' },
    { id: 'templates', label: 'Templates', icon: 'FileText' },
    { id: 'signing', label: 'Blockchain Signing', icon: 'Pen' },
    { id: 'metrics', label: 'Alumni Metrics', icon: 'TrendingUp' },
    { id: 'queue', label: 'Verification Queue', icon: 'Clock' }
  ];

  const handleApproveRequest = (requestId) => {
    console.log('Approving request:', requestId);
    // Implementation for approving request
  };

  const handleRejectRequest = (requestId) => {
    console.log('Rejecting request:', requestId);
    // Implementation for rejecting request
  };

  const handleBulkAction = (action, requestIds) => {
    console.log(`Bulk ${action}:`, requestIds);
    // Implementation for bulk actions
  };

  const handleCreateTemplate = (templateData) => {
    console.log('Creating template:', templateData);
    // Implementation for creating template
  };

  const handleEditTemplate = (templateId) => {
    console.log('Editing template:', templateId);
    // Implementation for editing template
  };

  const handleUseTemplate = (templateId) => {
    console.log('Using template:', templateId);
    // Implementation for using template
  };

  const handleSignCredential = async (credentialId) => {
    console.log('Signing credential:', credentialId);
    // Implementation for signing credential
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleDeployContract = async () => {
    console.log('Deploying smart contract');
    // Implementation for deploying contract
    return new Promise(resolve => 
      setTimeout(() => resolve({
        txHash: '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
        contractAddress: '0x1234567890abcdef1234567890abcdef12345678'
      }), 3000)
    );
  };

  const handleAssignStaff = (requestId, staffId) => {
    console.log('Assigning staff:', { requestId, staffId });
    // Implementation for assigning staff
  };

  const handleUpdatePriority = (requestId, priority) => {
    console.log('Updating priority:', { requestId, priority });
    // Implementation for updating priority
  };

  const handleProcessRequest = (requestId) => {
    console.log('Processing request:', requestId);
    // Implementation for processing request
  };

  const handleExportReport = () => {
    console.log('Exporting alumni metrics report');
    // Implementation for exporting report
  };

  const handleQuickCreateTemplate = () => {
    setActiveTab('templates');
  };

  const handleStudentLookup = (query) => {
    console.log('Looking up student:', query);
    // Implementation for student lookup
  };

  const handleBulkGenerate = (count) => {
    console.log('Bulk generating certificates:', count);
    // Implementation for bulk generation
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Institution Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card rounded-lg border border-border shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-card-foreground">1,247</div>
                    <div className="text-sm text-muted-foreground">Total Credentials Issued</div>
                  </div>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Award" size={24} className="text-primary" />
                  </div>
                </div>
                <div className="flex items-center space-x-1 mt-2 text-xs text-success">
                  <Icon name="TrendingUp" size={12} />
                  <span>+12% this month</span>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-card-foreground">23</div>
                    <div className="text-sm text-muted-foreground">Pending Requests</div>
                  </div>
                  <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                    <Icon name="Clock" size={24} className="text-warning" />
                  </div>
                </div>
                <div className="flex items-center space-x-1 mt-2 text-xs text-warning">
                  <Icon name="AlertTriangle" size={12} />
                  <span>5 high priority</span>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-card-foreground">94.2%</div>
                    <div className="text-sm text-muted-foreground">Alumni Employment</div>
                  </div>
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name="TrendingUp" size={24} className="text-success" />
                  </div>
                </div>
                <div className="flex items-center space-x-1 mt-2 text-xs text-success">
                  <Icon name="Users" size={12} />
                  <span>2,341 graduates tracked</span>
                </div>
              </div>

              <div className="bg-card rounded-lg border border-border shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-card-foreground">8.7/10</div>
                    <div className="text-sm text-muted-foreground">Reputation Score</div>
                  </div>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name="Star" size={24} className="text-accent" />
                  </div>
                </div>
                <div className="flex items-center space-x-1 mt-2 text-xs text-accent">
                  <Icon name="ArrowUp" size={12} />
                  <span>+0.3 this quarter</span>
                </div>
              </div>
            </div>

            <QuickActions
              onCreateTemplate={handleQuickCreateTemplate}
              onStudentLookup={handleStudentLookup}
              onBulkGenerate={handleBulkGenerate}
            />
          </div>
        );
      case 'requests':
        return (
          <PendingRequestsTable
            requests={pendingRequests}
            onApprove={handleApproveRequest}
            onReject={handleRejectRequest}
            onBulkAction={handleBulkAction}
          />
        );
      case 'templates':
        return (
          <CredentialTemplates
            templates={credentialTemplates}
            onCreateTemplate={handleCreateTemplate}
            onEditTemplate={handleEditTemplate}
            onUseTemplate={handleUseTemplate}
          />
        );
      case 'signing':
        return (
          <BlockchainSigningInterface
            signingQueue={signingQueue}
            onSignCredential={handleSignCredential}
            onDeployContract={handleDeployContract}
          />
        );
      case 'metrics':
        return (
          <AlumniMetrics
            metricsData={{}}
            onExportReport={handleExportReport}
          />
        );
      case 'queue':
        return (
          <VerificationQueue
            queueData={verificationQueue}
            onAssignStaff={handleAssignStaff}
            onUpdatePriority={handleUpdatePriority}
            onProcessRequest={handleProcessRequest}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">Institution Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage credential issuance and blockchain verification system
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm text-muted-foreground">Blockchain Connected</span>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/credential-verification-audit-trail')}
                iconName="Shield"
              >
                Audit Trail
              </Button>
              <Button
                onClick={() => navigate('/credential-upload-verification')}
                iconName="Plus"
              >
                Issue Credential
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <nav className="flex space-x-8">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default InstitutionDashboard;