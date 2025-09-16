import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AuditTrailTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('timestamp');
  const [sortOrder, setSortOrder] = useState('desc');

  const filterOptions = [
    { value: 'all', label: 'All Activities' },
    { value: 'issued', label: 'Credential Issued' },
    { value: 'verified', label: 'Verification Request' },
    { value: 'updated', label: 'Record Updated' },
    { value: 'revoked', label: 'Credential Revoked' }
  ];

  const auditTrailData = [
    {
      id: 1,
      timestamp: '2024-08-28T14:30:00Z',
      action: 'Credential Verified',
      type: 'verified',
      credentialId: 'CRED-2024-001234',
      actor: 'Google Inc.',
      actorType: 'employer',
      blockchainTx: '0x1a2b3c4d5e6f7890abcdef1234567890',
      gasUsed: '21000',
      status: 'confirmed',
      details: 'Employer verification for job application'
    },
    {
      id: 2,
      timestamp: '2024-08-28T12:15:00Z',
      action: 'Credential Issued',
      type: 'issued',
      credentialId: 'CRED-2024-001234',
      actor: 'MIT',
      actorType: 'institution',
      blockchainTx: '0x2b3c4d5e6f7890abcdef1234567890ab',
      gasUsed: '45000',
      status: 'confirmed',
      details: 'Bachelor of Computer Science degree issued'
    },
    {
      id: 3,
      timestamp: '2024-08-28T10:45:00Z',
      action: 'Document Uploaded',
      type: 'updated',
      credentialId: 'CRED-2024-001234',
      actor: 'Sarah Johnson',
      actorType: 'student',
      blockchainTx: '0x3c4d5e6f7890abcdef1234567890abcd',
      gasUsed: '32000',
      status: 'confirmed',
      details: 'Original diploma document uploaded to IPFS'
    },
    {
      id: 4,
      timestamp: '2024-08-27T16:20:00Z',
      action: 'Verification Request',
      type: 'verified',
      credentialId: 'CRED-2024-001234',
      actor: 'Microsoft Corp.',
      actorType: 'employer',
      blockchainTx: '0x4d5e6f7890abcdef1234567890abcdef',
      gasUsed: '18000',
      status: 'confirmed',
      details: 'Background check verification request'
    },
    {
      id: 5,
      timestamp: '2024-08-27T09:30:00Z',
      action: 'Profile Updated',
      type: 'updated',
      credentialId: 'CRED-2024-001234',
      actor: 'Sarah Johnson',
      actorType: 'student',
      blockchainTx: '0x5e6f7890abcdef1234567890abcdef12',
      gasUsed: '25000',
      status: 'confirmed',
      details: 'Student profile information updated'
    }
  ];

  const getActionIcon = (type) => {
    switch (type) {
      case 'issued': return 'FileCheck';
      case 'verified': return 'Shield';
      case 'updated': return 'Edit';
      case 'revoked': return 'XCircle';
      default: return 'Activity';
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'issued': return 'text-success';
      case 'verified': return 'text-primary';
      case 'updated': return 'text-warning';
      case 'revoked': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const getActorIcon = (actorType) => {
    switch (actorType) {
      case 'student': return 'User';
      case 'institution': return 'Building2';
      case 'employer': return 'Briefcase';
      default: return 'User';
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

  const filteredData = auditTrailData?.filter(item => {
    const matchesSearch = item?.action?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.actor?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         item?.credentialId?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesFilter = filterType === 'all' || item?.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const sortedData = [...filteredData]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (sortBy === 'timestamp') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
    <div className="bg-surface rounded-lg border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="History" size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Audit Trail</h2>
              <p className="text-sm text-muted-foreground">Complete transaction history</p>
            </div>
          </div>
          <Button variant="outline" iconName="Download" size="sm">
            Export CSV
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <Select
            options={filterOptions}
            value={filterType}
            onChange={setFilterType}
            className="sm:w-48"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-medium text-muted-foreground">
                <button
                  onClick={() => {
                    setSortBy('timestamp');
                    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                  }}
                  className="flex items-center space-x-1 hover:text-foreground"
                >
                  <span>Timestamp</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-muted-foreground">Action</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Actor</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Credential ID</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Blockchain Tx</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Gas Used</th>
              <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedData?.map((item) => (
              <tr key={item?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <div className="text-sm text-foreground">
                    {formatTimestamp(item?.timestamp)}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getActionIcon(item?.type)} 
                      size={16} 
                      className={getActionColor(item?.type)} 
                    />
                    <span className="text-sm font-medium text-foreground">{item?.action}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{item?.details}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getActorIcon(item?.actorType)} 
                      size={16} 
                      className="text-muted-foreground" 
                    />
                    <div>
                      <div className="text-sm font-medium text-foreground">{item?.actor}</div>
                      <div className="text-xs text-muted-foreground capitalize">{item?.actorType}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-mono text-foreground">{item?.credentialId}</span>
                </td>
                <td className="p-4">
                  <div className="text-sm font-mono text-foreground">
                    {item?.blockchainTx?.substring(0, 10)}...{item?.blockchainTx?.substring(item?.blockchainTx?.length - 8)}
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="ExternalLink"
                    className="mt-1 text-xs"
                  >
                    View on Explorer
                  </Button>
                </td>
                <td className="p-4">
                  <span className="text-sm text-muted-foreground">{item?.gasUsed}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span className="text-sm text-success capitalize">{item?.status}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {sortedData?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Results Found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default AuditTrailTable;