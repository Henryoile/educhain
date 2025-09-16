import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoleSelectionCard = ({ onRoleSelect, selectedRole }) => {
  const [hoveredRole, setHoveredRole] = useState(null);

  const roles = [
    {
      id: 'student',
      name: 'Student',
      icon: 'GraduationCap',
      color: 'bg-blue-500',
      description: 'Store and manage your academic credentials securely',
      benefits: [
        'Secure credential storage',
        'Instant verification',
        'Job application tracking',
        'Skills portfolio builder'
      ],
      features: [
        'Upload certificates and transcripts',
        'Connect with verified institutions',
        'Apply to jobs with verified credentials',
        'Track application status'
      ]
    },
    {
      id: 'institution',
      name: 'Institution',
      icon: 'Building2',
      color: 'bg-green-500',
      description: 'Issue tamper-proof credentials and manage student records',
      benefits: [
        'Blockchain-based issuance',
        'Fraud prevention',
        'Alumni tracking',
        'Reputation management'
      ],
      features: [
        'Issue verified certificates',
        'Manage student databases',
        'Track alumni success',
        'Institutional verification'
      ]
    },
    {
      id: 'employer',
      name: 'Employer',
      icon: 'Briefcase',
      color: 'bg-purple-500',
      description: 'Verify candidates instantly and hire with confidence',
      benefits: [
        'Instant verification',
        'Fraud detection',
        'Global talent access',
        'Smart contracts'
      ],
      features: [
        'Search verified candidates',
        'One-click credential verification',
        'Post jobs with smart contracts',
        'Milestone-based payments'
      ]
    }
  ];

  const handleRoleClick = (roleId) => {
    onRoleSelect(roleId);
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6 shadow-card">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Choose Your Role</h3>
          <p className="text-muted-foreground">Select how you'll be using EduChain platform</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          {roles?.map((role) => (
            <div
              key={role?.id}
              onMouseEnter={() => setHoveredRole(role?.id)}
              onMouseLeave={() => setHoveredRole(null)}
              className={`relative p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                selectedRole === role?.id
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-border hover:border-primary/50 hover:shadow-sm'
              }`}
              onClick={() => handleRoleClick(role?.id)}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-12 h-12 ${role?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={role?.icon} size={24} color="white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{role?.name}</h4>
                    <p className="text-sm text-muted-foreground">{role?.description}</p>
                  </div>
                  {selectedRole === role?.id && (
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="Check" size={16} color="white" />
                    </div>
                  )}
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h5 className="text-sm font-medium text-foreground mb-2">Key Benefits</h5>
                    <ul className="space-y-1">
                      {role?.benefits?.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {(hoveredRole === role?.id || selectedRole === role?.id) && (
                    <div className="pt-3 border-t border-border">
                      <h5 className="text-sm font-medium text-foreground mb-2">Features</h5>
                      <ul className="space-y-1">
                        {role?.features?.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Icon name="ArrowRight" size={12} className="text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {selectedRole && (
          <div className="pt-4 border-t border-border">
            <Button
              onClick={() => onRoleSelect(selectedRole)}
              iconName="ArrowRight"
              iconPosition="right"
              className="w-full"
            >
              Continue as {roles?.find(r => r?.id === selectedRole)?.name}
            </Button>
          </div>
        )}
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            You can change your role later in account settings
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionCard;