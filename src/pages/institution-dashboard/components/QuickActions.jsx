import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const QuickActions = ({ onCreateTemplate, onStudentLookup, onBulkGenerate }) => {
  const [lookupQuery, setLookupQuery] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkCount, setBulkCount] = useState('');

  const quickActionItems = [
    {
      title: 'Create Template',
      description: 'Design new credential template',
      icon: 'FileText',
      color: 'bg-primary text-primary-foreground',
      action: () => onCreateTemplate()
    },
    {
      title: 'Student Lookup',
      description: 'Search student records',
      icon: 'Search',
      color: 'bg-accent text-accent-foreground',
      action: () => handleStudentLookup()
    },
    {
      title: 'Bulk Generate',
      description: 'Generate multiple certificates',
      icon: 'Layers',
      color: 'bg-secondary text-secondary-foreground',
      action: () => setShowBulkModal(true)
    },
    {
      title: 'Audit Trail',
      description: 'View verification history',
      icon: 'Shield',
      color: 'bg-warning text-warning-foreground',
      action: () => window.location.href = '/credential-verification-audit-trail'
    }
  ];

  const recentActions = [
    {
      action: 'Template Created',
      details: 'Bachelor of Science template',
      timestamp: new Date(Date.now() - 1800000),
      user: 'Dr. Sarah Johnson'
    },
    {
      action: 'Bulk Certificate Generation',
      details: '25 graduation certificates',
      timestamp: new Date(Date.now() - 3600000),
      user: 'Mike Wilson'
    },
    {
      action: 'Student Verification',
      details: 'John Smith - Computer Science',
      timestamp: new Date(Date.now() - 7200000),
      user: 'Jane Smith'
    },
    {
      action: 'Contract Deployment',
      details: 'New smart contract deployed',
      timestamp: new Date(Date.now() - 10800000),
      user: 'System'
    }
  ];

  const handleStudentLookup = () => {
    if (lookupQuery?.trim()) {
      onStudentLookup(lookupQuery);
      setLookupQuery('');
    }
  };

  const handleBulkGenerate = () => {
    if (bulkCount && parseInt(bulkCount) > 0) {
      onBulkGenerate(parseInt(bulkCount));
      setBulkCount('');
      setShowBulkModal(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Action Buttons */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActionItems?.map((item, index) => (
            <button
              key={index}
              onClick={item?.action}
              className="p-4 rounded-lg border border-border hover:shadow-md transition-all duration-200 text-left group"
            >
              <div className={`w-10 h-10 ${item?.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon name={item?.icon} size={20} />
              </div>
              <h4 className="text-sm font-medium text-card-foreground mb-1">{item?.title}</h4>
              <p className="text-xs text-muted-foreground">{item?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Student Lookup */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Student Verification Lookup</h3>
        <div className="flex items-center space-x-3">
          <div className="flex-1">
            <Input
              placeholder="Enter student ID, name, or email"
              value={lookupQuery}
              onChange={(e) => setLookupQuery(e?.target?.value)}
              onKeyPress={(e) => e?.key === 'Enter' && handleStudentLookup()}
            />
          </div>
          <Button
            onClick={handleStudentLookup}
            iconName="Search"
            disabled={!lookupQuery?.trim()}
          >
            Search
          </Button>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground">
          Search by student ID, full name, email address, or credential number
        </div>
      </div>
      {/* Recent Actions */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-card-foreground">Recent Actions</h3>
          <Button variant="ghost" size="sm" iconName="RefreshCw">
            Refresh
          </Button>
        </div>
        
        <div className="space-y-3">
          {recentActions?.map((action, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors">
              <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                <Icon name="Activity" size={16} className="text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-card-foreground">{action?.action}</div>
                <div className="text-xs text-muted-foreground">{action?.details}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">
                  {action?.timestamp?.toLocaleTimeString()}
                </div>
                <div className="text-xs text-muted-foreground">{action?.user}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* System Status */}
      <div className="bg-card rounded-lg border border-border shadow-sm p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-card-foreground">Blockchain Network</div>
              <div className="text-xs text-muted-foreground">Connected • Block #2,847,392</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-card-foreground">IPFS Storage</div>
              <div className="text-xs text-muted-foreground">Online • 99.9% uptime</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <div>
              <div className="text-sm font-medium text-card-foreground">Processing Queue</div>
              <div className="text-xs text-muted-foreground">12 pending • 4 hrs avg</div>
            </div>
          </div>
        </div>
      </div>
      {/* Bulk Generation Modal */}
      {showBulkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg border border-border shadow-modal p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-card-foreground">Bulk Certificate Generation</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBulkModal(false)}
                iconName="X"
              />
            </div>
            
            <div className="space-y-4">
              <Input
                label="Number of Certificates"
                type="number"
                placeholder="Enter quantity"
                value={bulkCount}
                onChange={(e) => setBulkCount(e?.target?.value)}
                min="1"
                max="100"
              />
              
              <div className="text-sm text-muted-foreground">
                This will generate certificates for the selected template and student list.
                Maximum 100 certificates per batch.
              </div>
              
              <div className="flex items-center justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowBulkModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleBulkGenerate}
                  disabled={!bulkCount || parseInt(bulkCount) <= 0}
                  iconName="Layers"
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;