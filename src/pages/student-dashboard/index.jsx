import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import CredentialPortfolio from './components/CredentialPortfolio';
import SkillsShowcase from './components/SkillsShowcase';
import JobOpportunities from './components/JobOpportunities';
import ProfileCompletion from './components/ProfileCompletion';
import QuickActions from './components/QuickActions';
import BlockchainMonitor from './components/BlockchainMonitor';

const StudentDashboard = () => {
  const location = useLocation();
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Credential Verified',
      message: 'Your AWS Certificate has been successfully verified on blockchain',
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'New Job Match',
      message: 'Found 3 new job opportunities matching your skills',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      read: false
    }
  ]);

  const [dashboardStats, setDashboardStats] = useState({
    totalCredentials: 4,
    verifiedSkills: 6,
    jobApplications: 3,
    profileCompletion: 75
  });

  // Handle pull-to-refresh functionality
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API calls
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  // Mark notifications as read
  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev => 
      prev?.map(notif => 
        notif?.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  // Get unread notification count
  const unreadCount = notifications?.filter(n => !n?.read)?.length;

  // Format time ago
  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Welcome back, Alex!</h1>
              <p className="text-muted-foreground mt-1">
                Manage your credentials and explore new opportunities
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Refresh Button */}
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                loading={refreshing}
                onClick={handleRefresh}
              >
                {refreshing ? 'Refreshing...' : 'Refresh'}
              </Button>

              {/* Notifications */}
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="Bell"
                  className="relative"
                >
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center">
                      <span className="text-xs text-warning-foreground font-medium">
                        {unreadCount}
                      </span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 mt-4 text-sm">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </a>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            <span className="text-foreground font-medium">Student Dashboard</span>
          </nav>
        </div>
      </div>
      {/* Dashboard Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Award" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{dashboardStats?.totalCredentials}</p>
                <p className="text-sm text-muted-foreground">Credentials</p>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Icon name="Trophy" size={20} className="text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{dashboardStats?.verifiedSkills}</p>
                <p className="text-sm text-muted-foreground">Verified Skills</p>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Icon name="Send" size={20} className="text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{dashboardStats?.jobApplications}</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                <Icon name="User" size={20} className="text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{dashboardStats?.profileCompletion}%</p>
                <p className="text-sm text-muted-foreground">Profile</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notification Toasts */}
        {notifications?.filter(n => !n?.read)?.length > 0 && (
          <div className="fixed top-20 right-4 z-50 space-y-2">
            {notifications?.filter(n => !n?.read)?.slice(0, 2)?.map((notification) => (
              <div
                key={notification?.id}
                className="bg-surface border border-border rounded-lg shadow-modal p-4 max-w-sm animate-in slide-in-from-right"
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    notification?.type === 'success' ? 'bg-success/10' :
                    notification?.type === 'info' ? 'bg-primary/10' :
                    notification?.type === 'warning' ? 'bg-warning/10' : 'bg-error/10'
                  }`}>
                    <Icon 
                      name={
                        notification?.type === 'success' ? 'CheckCircle' :
                        notification?.type === 'info' ? 'Info' :
                        notification?.type === 'warning' ? 'AlertTriangle' : 'XCircle'
                      } 
                      size={16} 
                      className={
                        notification?.type === 'success' ? 'text-success' :
                        notification?.type === 'info' ? 'text-primary' :
                        notification?.type === 'warning' ? 'text-warning' : 'text-error'
                      }
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-sm mb-1">
                      {notification?.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification?.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatTimeAgo(notification?.timestamp)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="X"
                    onClick={() => markNotificationAsRead(notification?.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <CredentialPortfolio />
            <SkillsShowcase />
            <JobOpportunities />
          </div>

          {/* Right Column - Sidebar Content */}
          <div className="space-y-8">
            <ProfileCompletion />
            <QuickActions />
            <BlockchainMonitor />
          </div>
        </div>

        {/* Mobile-Optimized Bottom Actions */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-border p-4">
          <div className="flex space-x-2">
            <Button
              variant="default"
              size="sm"
              iconName="Upload"
              iconPosition="left"
              className="flex-1"
            >
              Upload
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Search"
              iconPosition="left"
              className="flex-1"
            >
              Find Jobs
            </Button>
            <Button
              variant="ghost"
              size="sm"
              iconName="User"
              iconPosition="left"
              className="flex-1"
            >
              Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;