import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const VerificationQueue = ({ queueData, onAssignStaff, onUpdatePriority, onProcessRequest }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState('');

  const filterOptions = [
    { value: 'all', label: 'All Requests' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' },
    { value: 'unassigned', label: 'Unassigned' }
  ];

  const staffOptions = [
    { value: 'john_doe', label: 'John Doe - Registrar' },
    { value: 'jane_smith', label: 'Jane Smith - Academic Officer' },
    { value: 'mike_wilson', label: 'Mike Wilson - Verification Specialist' },
    { value: 'sarah_brown', label: 'Sarah Brown - Senior Registrar' }
  ];

  const filteredQueue = queueData?.filter(item => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unassigned') return !item?.assignedTo;
    return item?.priority === selectedFilter;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getEstimatedTime = (priority, complexity) => {
    const baseTime = {
      high: 2,
      medium: 4,
      low: 8
    };
    
    const complexityMultiplier = {
      simple: 1,
      moderate: 1.5,
      complex: 2.5
    };
    
    return Math.round(baseTime?.[priority] * complexityMultiplier?.[complexity]);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Real-time Verification Queue</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Current workload: {queueData?.length} requests • Avg processing time: 4.2 hours
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Select
              options={filterOptions}
              value={selectedFilter}
              onChange={setSelectedFilter}
              className="w-40"
            />
            <Button
              variant="outline"
              iconName="RefreshCw"
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Queue Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-warning" />
              <span className="text-sm font-medium text-card-foreground">Pending</span>
            </div>
            <div className="text-2xl font-bold text-card-foreground mt-2">
              {queueData?.filter(item => item?.status === 'pending')?.length}
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="UserCheck" size={16} className="text-primary" />
              <span className="text-sm font-medium text-card-foreground">In Progress</span>
            </div>
            <div className="text-2xl font-bold text-card-foreground mt-2">
              {queueData?.filter(item => item?.status === 'in_progress')?.length}
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-error" />
              <span className="text-sm font-medium text-card-foreground">High Priority</span>
            </div>
            <div className="text-2xl font-bold text-card-foreground mt-2">
              {queueData?.filter(item => item?.priority === 'high')?.length}
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={16} className="text-success" />
              <span className="text-sm font-medium text-card-foreground">Unassigned</span>
            </div>
            <div className="text-2xl font-bold text-card-foreground mt-2">
              {queueData?.filter(item => !item?.assignedTo)?.length}
            </div>
          </div>
        </div>

        {/* Queue Items */}
        <div className="space-y-4">
          {filteredQueue?.map((item) => (
            <div key={item?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="FileCheck" size={20} className="text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="text-sm font-medium text-card-foreground">{item?.studentName}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(item?.priority)}`}>
                        {item?.priority} priority
                      </span>
                      {item?.isUrgent && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error text-error-foreground">
                          <Icon name="Zap" size={12} className="mr-1" />
                          Urgent
                        </span>
                      )}
                    </div>
                    
                    <div className="text-sm text-muted-foreground mb-2">
                      {item?.credentialType} • {item?.program}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>Submitted: {new Date(item.submissionDate)?.toLocaleDateString()}</span>
                      <span>Est. Time: {getEstimatedTime(item?.priority, item?.complexity)} hours</span>
                      <span>Complexity: {item?.complexity}</span>
                    </div>
                    
                    {item?.assignedTo && (
                      <div className="flex items-center space-x-2 mt-2">
                        <Icon name="User" size={14} className="text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Assigned to: {staffOptions?.find(staff => staff?.value === item?.assignedTo)?.label || item?.assignedTo}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  {!item?.assignedTo && (
                    <Select
                      options={[{ value: '', label: 'Assign to...' }, ...staffOptions]}
                      value=""
                      onChange={(value) => value && onAssignStaff(item?.id, value)}
                      className="w-48"
                    />
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onProcessRequest(item?.id)}
                    iconName="Play"
                  >
                    Process
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    iconName="MoreHorizontal"
                  />
                </div>
              </div>
              
              {/* Progress Bar for In Progress Items */}
              {item?.status === 'in_progress' && (
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>Verification Progress</span>
                    <span>{item?.progress}% complete</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item?.progress}%` }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredQueue?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">Queue is Empty</h3>
            <p className="text-muted-foreground">
              {selectedFilter === 'all' ?'No verification requests in the queue.' 
                : `No ${selectedFilter} priority requests found.`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationQueue;