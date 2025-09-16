import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'End-to-End Encryption',
      description: 'All data is encrypted using industry-standard protocols'
    },
    {
      icon: 'Lock',
      title: 'SSL Certificate',
      description: 'Secure connection with 256-bit SSL encryption'
    },
    {
      icon: 'CheckCircle',
      title: 'Blockchain Verified',
      description: 'Immutable records on Ethereum blockchain'
    },
    {
      icon: 'Eye',
      title: 'Privacy First',
      description: 'Your data remains under your complete control'
    }
  ];

  const partnerships = [
    {
      name: 'MIT',
      logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=60&fit=crop&crop=center',
      type: 'University Partner'
    },
    {
      name: 'Stanford',
      logo: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=100&h=60&fit=crop&crop=center',
      type: 'Academic Partner'
    },
    {
      name: 'Harvard',
      logo: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=100&h=60&fit=crop&crop=center',
      type: 'Research Partner'
    },
    {
      name: 'Berkeley',
      logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=60&fit=crop&crop=center',
      type: 'Innovation Partner'
    }
  ];

  const certifications = [
    {
      name: 'SOC 2 Type II',
      icon: 'Award',
      description: 'Security audit compliance'
    },
    {
      name: 'GDPR Compliant',
      icon: 'Shield',
      description: 'Data protection standards'
    },
    {
      name: 'ISO 27001',
      icon: 'CheckCircle',
      description: 'Information security management'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Security & Trust</h3>
          <p className="text-sm text-muted-foreground">
            Your credentials are protected by enterprise-grade security
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={feature?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground">{feature?.title}</h4>
                <p className="text-xs text-muted-foreground mt-1">{feature?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* University Partnerships */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Trusted by Leading Institutions</h3>
          <p className="text-sm text-muted-foreground">
            Partnered with top universities worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {partnerships?.map((partner, index) => (
            <div key={index} className="text-center space-y-2">
              <div className="w-full h-16 bg-muted rounded-lg overflow-hidden">
                <Image
                  src={partner?.logo}
                  alt={`${partner?.name} logo`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{partner?.name}</div>
                <div className="text-xs text-muted-foreground">{partner?.type}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Certifications */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Compliance & Certifications</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {certifications?.map((cert, index) => (
            <div key={index} className="text-center space-y-2 p-4 bg-muted/30 rounded-lg">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name={cert?.icon} size={20} className="text-success" />
              </div>
              <div>
                <div className="text-sm font-medium text-foreground">{cert?.name}</div>
                <div className="text-xs text-muted-foreground">{cert?.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Network Status */}
      <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
            <div>
              <div className="text-sm font-medium text-foreground">Ethereum Sepolia Testnet</div>
              <div className="text-xs text-muted-foreground">Network Status: Active</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">Block Height</div>
            <div className="text-xs font-mono text-muted-foreground">4,892,156</div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
            <Icon name="Info" size={14} />
            <span>Using testnet for development and testing purposes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;