import React, { useState, useContext, createContext } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

// User Context for role-based navigation
const UserContext = createContext({
  role: 'student',
  walletConnected: true,
  transactionCount: 0
});

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const { role, walletConnected, transactionCount } = useContext(UserContext);
  const [activeTransaction, setActiveTransaction] = useState(null);

  // Role-based navigation configuration
  const navigationConfig = {
    student: [
      { 
        label: 'Dashboard', 
        path: '/student-dashboard', 
        icon: 'LayoutDashboard',
        tooltip: 'View your credential portfolio and blockchain activity'
      },
      { 
        label: 'Upload Credentials', 
        path: '/credential-upload-verification', 
        icon: 'Upload',
        tooltip: 'Upload and verify new credentials on blockchain'
      },
      { 
        label: 'Verification Trail', 
        path: '/credential-verification-audit-trail', 
        icon: 'Shield',
        tooltip: 'Track verification history and audit trail'
      },
    ],
    institution: [
      { 
        label: 'Institution Dashboard', 
        path: '/institution-dashboard', 
        icon: 'Building2',
        tooltip: 'Manage institutional credential issuance'
      },
      { 
        label: 'Issue Credentials', 
        path: '/credential-upload-verification', 
        icon: 'FileCheck',
        tooltip: 'Issue verified credentials to students'
      },
      { 
        label: 'Verification Trail', 
        path: '/credential-verification-audit-trail', 
        icon: 'Shield',
        tooltip: 'Monitor credential verification activity'
      },
    ],
    employer: [
      { 
        label: 'Employer Dashboard', 
        path: '/employer-dashboard-candidate-search', 
        icon: 'Search',
        tooltip: 'Search and verify candidate credentials'
      },
      { 
        label: 'Candidate Search', 
        path: '/employer-dashboard-candidate-search', 
        icon: 'Users',
        tooltip: 'Find candidates with verified credentials'
      },
      { 
        label: 'Verification Tools', 
        path: '/credential-verification-audit-trail', 
        icon: 'Shield',
        tooltip: 'Verify credential authenticity and fraud prevention'
      },
    ]
  };

  const currentNavigation = navigationConfig?.[role] || navigationConfig?.student;
  const isActivePath = (path) => location?.pathname === path;

  const handleWalletConnect = () => {
    // Wallet connection logic
    console.log('Connecting wallet...');
  };

  const handleTransactionClick = () => {
    setActiveTransaction(activeTransaction ? null : 'sample-tx');
  };

  return (
    <aside className={`fixed left-0 top-0 h-full bg-surface border-r border-border shadow-card z-40 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-60'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header with Logo and Collapse Toggle */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">EduChain</span>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="hidden lg:flex"
            iconName={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
          />
        </div>

        {/* Wallet Connection Status */}
        <div className="p-4 border-b border-border">
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Wallet Status</span>
                <div className={`w-2 h-2 rounded-full ${walletConnected ? 'bg-success' : 'bg-error'}`}></div>
              </div>
              
              {walletConnected ? (
                <div className="space-y-2">
                  <div className="text-xs font-mono text-muted-foreground bg-muted p-2 rounded">
                    0x1234...5678
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Balance: 2.45 ETH
                  </div>
                </div>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleWalletConnect}
                  iconName="Wallet"
                  className="w-full"
                >
                  Connect Wallet
                </Button>
              )}
            </div>
          ) : (
            <div className="flex justify-center">
              <div className={`w-3 h-3 rounded-full ${walletConnected ? 'bg-success' : 'bg-error'}`}></div>
            </div>
          )}
        </div>

        {/* Role-Based Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {!isCollapsed && (
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                {role?.charAt(0)?.toUpperCase() + role?.slice(1)} Portal
              </div>
            )}
            
            {currentNavigation?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={isCollapsed ? item?.tooltip : ''}
              >
                <Icon 
                  name={item?.icon} 
                  size={18} 
                  className={`flex-shrink-0 ${isActivePath(item?.path) ? 'text-primary-foreground' : ''}`}
                />
                {!isCollapsed && <span className="truncate">{item?.label}</span>}
                
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded shadow-modal opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item?.label}
                  </div>
                )}
              </a>
            ))}
          </div>
        </nav>

        {/* Blockchain Transaction Monitor */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Transactions</span>
                {transactionCount > 0 && (
                  <div className="w-5 h-5 bg-warning rounded-full flex items-center justify-center">
                    <span className="text-xs text-warning-foreground font-medium">{transactionCount}</span>
                  </div>
                )}
              </div>
              
              {transactionCount > 0 ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleTransactionClick}
                  iconName="Activity"
                  className="w-full justify-start text-left"
                >
                  View Active Transactions
                </Button>
              ) : (
                <div className="text-xs text-muted-foreground">
                  No active transactions
                </div>
              )}
              
              {activeTransaction && (
                <div className="bg-muted p-3 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium">Credential Upload</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                      <span className="text-xs text-warning">Pending</span>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-muted-foreground">
                    0xabc123...def456
                  </div>
                  <div className="w-full bg-border rounded-full h-1">
                    <div className="bg-warning h-1 rounded-full w-3/4 transition-all duration-300"></div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-center">
              {transactionCount > 0 ? (
                <div className="relative">
                  <Icon name="Activity" size={18} className="text-warning" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full flex items-center justify-center">
                    <span className="text-xs text-warning-foreground font-medium">{transactionCount}</span>
                  </div>
                </div>
              ) : (
                <Icon name="Activity" size={18} className="text-muted-foreground" />
              )}
            </div>
          )}
        </div>

        {/* User Role Indicator */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon 
                  name={role === 'student' ? 'User' : role === 'institution' ? 'Building2' : 'Briefcase'} 
                  size={16} 
                  color="white" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {role?.charAt(0)?.toUpperCase() + role?.slice(1)} Account
                </div>
                <div className="text-xs text-muted-foreground">
                  {walletConnected ? 'Verified' : 'Unverified'}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon 
                  name={role === 'student' ? 'User' : role === 'institution' ? 'Building2' : 'Briefcase'} 
                  size={16} 
                  color="white" 
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

// Provider component for user context
export const UserProvider = ({ children, role = 'student', walletConnected = true, transactionCount = 2 }) => {
  return (
    <UserContext.Provider value={{ role, walletConnected, transactionCount }}>
      {children}
    </UserContext.Provider>
  );
};

export default Sidebar;