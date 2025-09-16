import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CandidateCard = ({ candidate, onViewProfile, onVerifyCredentials, onStartContract }) => {
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerifyCredentials = async () => {
    setIsVerifying(true);
    // Simulate blockchain verification
    setTimeout(() => {
      setIsVerifying(false);
      onVerifyCredentials(candidate?.id);
    }, 2000);
  };

  const getSkillMatchColor = (percentage) => {
    if (percentage >= 90) return 'text-success bg-success/10';
    if (percentage >= 70) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200">
      <div className="flex items-start space-x-4">
        {/* Profile Image */}
        <div className="relative">
          <Image
            src={candidate?.avatar}
            alt={candidate?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {candidate?.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-card">
              <Icon name="Shield" size={12} color="white" />
            </div>
          )}
        </div>

        {/* Candidate Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-foreground truncate">
                {candidate?.name}
              </h3>
              <p className="text-sm text-muted-foreground">{candidate?.title}</p>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSkillMatchColor(candidate?.skillMatch)}`}>
              {candidate?.skillMatch}% Match
            </div>
          </div>

          {/* Location and Experience */}
          <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{candidate?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Briefcase" size={14} />
              <span>{candidate?.experience} years</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="DollarSign" size={14} />
              <span>${candidate?.expectedSalary}k</span>
            </div>
          </div>

          {/* Skills */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {candidate?.skills?.slice(0, 4)?.map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md"
                >
                  {skill}
                </span>
              ))}
              {candidate?.skills?.length > 4 && (
                <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
                  +{candidate?.skills?.length - 4} more
                </span>
              )}
            </div>
          </div>

          {/* Credentials Summary */}
          <div className="mb-4">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                <Icon name="GraduationCap" size={14} className="text-primary" />
                <span className="text-foreground">{candidate?.education}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Award" size={14} className="text-accent" />
                <span className="text-foreground">{candidate?.certifications} certs</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={14} className="text-success" />
                <span className="text-foreground">Verified</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProfile(candidate?.id)}
              iconName="User"
              iconPosition="left"
            >
              View Profile
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              loading={isVerifying}
              onClick={handleVerifyCredentials}
              iconName="Shield"
              iconPosition="left"
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
            </Button>
            
            <Button
              variant="default"
              size="sm"
              onClick={() => onStartContract(candidate?.id)}
              iconName="FileText"
              iconPosition="left"
            >
              Start Contract
            </Button>
          </div>
        </div>
      </div>
      {/* Blockchain Status */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Blockchain Verified</span>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="Clock" size={12} />
            <span>Last verified {candidate?.lastVerified}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;