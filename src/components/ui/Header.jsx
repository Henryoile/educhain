import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const location = useLocation();
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard' },
    { label: 'Credentials', path: '/credential-upload-verification', icon: 'FileCheck' },
    { label: 'Verification', path: '/credential-verification-audit-trail', icon: 'Shield' },
    { label: 'Institution', path: '/institution-dashboard', icon: 'Building2' },
  ];

  const moreItems = [
    { label: 'Employer Search', path: '/employer-dashboard-candidate-search', icon: 'Search' },
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  return (
    <header className="bg-surface border-b border-border shadow-card sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuToggle}
            className="lg:hidden"
            iconName={isMenuOpen ? 'X' : 'Menu'}
          />
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">EduChain</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <a
              key={item?.path}
              href={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </a>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
              iconName="MoreHorizontal"
              className="text-muted-foreground hover:text-foreground"
            >
              More
            </Button>
            
            {isMoreMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-modal z-50">
                <div className="py-2">
                  {moreItems?.map((item) => (
                    <a
                      key={item?.path}
                      href={item?.path}
                      className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-200"
                      onClick={() => setIsMoreMenuOpen(false)}
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Wallet Connection Status */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm font-mono text-muted-foreground">0x1234...5678</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Wallet"
            className="hidden sm:flex"
          >
            Connected
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            iconName="Bell"
            className="relative"
          >
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-warning rounded-full flex items-center justify-center">
              <span className="text-xs text-warning-foreground font-medium">2</span>
            </div>
          </Button>
        </div>
      </div>
      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-surface border-b border-border shadow-modal z-40">
          <nav className="px-6 py-4 space-y-2">
            {[...navigationItems, ...moreItems]?.map((item) => (
              <a
                key={item?.path}
                href={item?.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                onClick={() => onMenuToggle()}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </a>
            ))}
          </nav>
          
          {/* Mobile Wallet Status */}
          <div className="px-6 py-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-sm font-mono text-muted-foreground">Wallet Connected</span>
              </div>
              <Button variant="outline" size="sm">
                Manage
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;