import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PendingRequestsTable = ({ requests, onApprove, onReject, onBulkAction }) => {
  const [selectedRequests, setSelectedRequests] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'submissionDate', direction: 'desc' });

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRequests(requests?.map(req => req?.id));
    } else {
      setSelectedRequests([]);
    }
  };

  const handleSelectRequest = (requestId, checked) => {
    if (checked) {
      setSelectedRequests([...selectedRequests, requestId]);
    } else {
      setSelectedRequests(selectedRequests?.filter(id => id !== requestId));
    }
  };

  const handleSort = (key) => {
    const direction = sortConfig?.key === key && sortConfig?.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const sortedRequests = [...requests]?.sort((a, b) => {
    if (sortConfig?.direction === 'asc') {
      return a?.[sortConfig?.key] > b?.[sortConfig?.key] ? 1 : -1;
    }
    return a?.[sortConfig?.key] < b?.[sortConfig?.key] ? 1 : -1;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-card-foreground">Pending Credential Requests</h3>
          {selectedRequests?.length > 0 && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                {selectedRequests?.length} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBulkAction('approve', selectedRequests)}
                iconName="Check"
              >
                Bulk Approve
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onBulkAction('reject', selectedRequests)}
                iconName="X"
              >
                Bulk Reject
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="w-12 p-4">
                <Checkbox
                  checked={selectedRequests?.length === requests?.length && requests?.length > 0}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('submissionDate')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Submission Date</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('studentName')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Student Name</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('credentialType')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Credential Type</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <button
                  onClick={() => handleSort('priority')}
                  className="flex items-center space-x-1 text-sm font-medium text-muted-foreground hover:text-foreground"
                >
                  <span>Priority</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4">
                <span className="text-sm font-medium text-muted-foreground">Status</span>
              </th>
              <th className="text-right p-4">
                <span className="text-sm font-medium text-muted-foreground">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedRequests?.map((request) => (
              <tr key={request?.id} className="border-t border-border hover:bg-muted/30">
                <td className="p-4">
                  <Checkbox
                    checked={selectedRequests?.includes(request?.id)}
                    onChange={(e) => handleSelectRequest(request?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="text-sm text-card-foreground">
                    {new Date(request.submissionDate)?.toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(request.submissionDate)?.toLocaleTimeString()}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} className="text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-card-foreground">{request?.studentName}</div>
                      <div className="text-xs text-muted-foreground">{request?.studentId}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="text-sm text-card-foreground">{request?.credentialType}</div>
                  <div className="text-xs text-muted-foreground">{request?.program}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request?.priority)}`}>
                    {request?.priority?.charAt(0)?.toUpperCase() + request?.priority?.slice(1)}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-warning rounded-full"></div>
                    <span className="text-sm text-muted-foreground">Pending Review</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onApprove(request?.id)}
                      iconName="Check"
                      className="text-success hover:bg-success/10"
                    >
                      Approve
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onReject(request?.id)}
                      iconName="X"
                      className="text-error hover:bg-error/10"
                    >
                      Reject
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      iconName="MoreHorizontal"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {requests?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="FileCheck" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-card-foreground mb-2">No Pending Requests</h3>
          <p className="text-muted-foreground">All credential requests have been processed.</p>
        </div>
      )}
    </div>
  );
};

export default PendingRequestsTable;