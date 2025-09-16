import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'credential_upload',
      title: 'AWS Certificate Uploaded',
      description: 'Blockchain verification in progress',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      status: 'pending',
      icon: 'Upload'
    },
    {
      id: 2,
      type: 'job_application',
      title: 'Applied to React Developer',
      description: 'TechCorp Solutions - Smart contract created',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      status: 'completed',
      icon: 'Send'
    },
    {
      id: 3,
      type: 'skill_verified',
      title: 'React Certification Verified',
      description: 'Meta certification confirmed on blockchain',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      status: 'completed',
      icon: 'CheckCircle'
    }
  ]);

  const quickActionItems = [
    {
      id: 'upload',
      title: 'Upload Credential',
      description: 'Add new certificate or diploma',
      icon: 'Upload',
      color: 'bg-primary text-primary-foreground',
      action: () => console.log('Navigate to upload')
    },
    {
      id: 'profile',
      title: 'Update Profile',
      description: 'Edit personal information',
      icon: 'User',
      color: 'bg-secondary text-secondary-foreground',
      action: () => console.log('Navigate to profile')
    },
    {
      id: 'applications',
      title: 'View Applications',
      description: 'Check application status',
      icon: 'FileText',
      color: 'bg-accent text-accent-foreground',
      action: () => console.log('Navigate to applications')
    },
    {
      id: 'wallet',
      title: 'Wallet Status',
      description: 'Manage blockchain wallet',
      icon: 'Wallet',
      color: 'bg-warning text-warning-foreground',
      action: () => console.log('Navigate to wallet')
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'pending': return 'text-warning';
      case 'failed': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'AlertCircle';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Zap" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Quick Actions</h2>
            <p className="text-sm text-muted-foreground">Shortcuts to common tasks</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Quick Action Buttons */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickActionItems?.map((item) => (
            <button
              key={item?.id}
              onClick={item?.action}
              className="group bg-card border border-border rounded-lg p-4 hover:shadow-modal transition-all duration-200 text-left"
            >
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${item?.color} group-hover:scale-105 transition-transform duration-200`}>
                <Icon name={item?.icon} size={20} />
              </div>
              <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                {item?.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {item?.description}
              </p>
            </button>
          ))}
        </div>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
            <Button
              variant="ghost"
              size="sm"
              iconName="ExternalLink"
              iconPosition="right"
            >
              View All
            </Button>
          </div>

          <div className="space-y-3">
            {recentActivity?.map((activity) => (
              <div
                key={activity?.id}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={activity?.icon} size={18} className="text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-1">
                          {activity?.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {activity?.description}
                        </p>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <span>{formatTimeAgo(activity?.timestamp)}</span>
                          <div className="flex items-center space-x-1">
                            <Icon 
                              name={getStatusIcon(activity?.status)} 
                              size={12} 
                              className={getStatusColor(activity?.status)}
                            />
                            <span className={`capitalize ${getStatusColor(activity?.status)}`}>
                              {activity?.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="ChevronRight"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {recentActivity?.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Activity" size={20} className="text-muted-foreground" />
              </div>
              <h4 className="font-medium text-foreground mb-1">No Recent Activity</h4>
              <p className="text-sm text-muted-foreground">
                Your recent actions will appear here
              </p>
            </div>
          )}
        </div>

        {/* Action Suggestions */}
        <div className="mt-8 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-2">Suggested Actions</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Complete your profile to get better job matches
                  </span>
                  <Button variant="ghost" size="xs" iconName="ArrowRight">
                    Complete
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Connect GitHub to showcase your projects
                  </span>
                  <Button variant="ghost" size="xs" iconName="ArrowRight">
                    Connect
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Verify your latest certification
                  </span>
                  <Button variant="ghost" size="xs" iconName="ArrowRight">
                    Verify
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;