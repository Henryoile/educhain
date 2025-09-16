import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProfileCompletion = () => {
  const [completedSteps, setCompletedSteps] = useState(new Set([1, 2, 4]));

  const profileSteps = [
    {
      id: 1,
      title: "Basic Information",
      description: "Complete your personal details and contact information",
      icon: "User",
      completed: true,
      points: 15
    },
    {
      id: 2,
      title: "Wallet Connection",
      description: "Connect your blockchain wallet for credential verification",
      icon: "Wallet",
      completed: true,
      points: 20
    },
    {
      id: 3,
      title: "Upload First Credential",
      description: "Add your first academic certificate or diploma",
      icon: "Upload",
      completed: false,
      points: 25,
      action: "Upload Now"
    },
    {
      id: 4,
      title: "Skills Verification",
      description: "Connect learning platforms to verify your skills",
      icon: "Trophy",
      completed: true,
      points: 20
    },
    {
      id: 5,
      title: "Professional Photo",
      description: "Add a professional profile picture",
      icon: "Camera",
      completed: false,
      points: 10,
      action: "Add Photo"
    },
    {
      id: 6,
      title: "Career Preferences",
      description: "Set your job preferences and career goals",
      icon: "Target",
      completed: false,
      points: 10,
      action: "Set Preferences"
    }
  ];

  const totalPoints = profileSteps?.reduce((sum, step) => sum + step?.points, 0);
  const earnedPoints = profileSteps?.filter(step => completedSteps?.has(step?.id))?.reduce((sum, step) => sum + step?.points, 0);
  const completionPercentage = Math.round((earnedPoints / totalPoints) * 100);

  const handleStepAction = (stepId) => {
    // Simulate completing a step
    setCompletedSteps(prev => new Set([...prev, stepId]));
  };

  const nextSteps = profileSteps?.filter(step => !completedSteps?.has(step?.id))?.slice(0, 3);

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">Profile Completion</h2>
            <p className="text-sm text-muted-foreground">Complete your profile to unlock more opportunities</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Progress Overview */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-semibold text-foreground">{completionPercentage}% Complete</h3>
              <p className="text-sm text-muted-foreground">
                {earnedPoints} of {totalPoints} points earned
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{completedSteps?.size}</div>
              <div className="text-xs text-muted-foreground">of {profileSteps?.length} steps</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-border rounded-full h-3 mb-4">
            <div
              className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>

          {/* Completion Benefits */}
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="Star" size={20} className="text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-1">Complete Your Profile</h4>
                <p className="text-sm text-muted-foreground">
                  Unlock premium features, get better job matches, and increase your visibility to employers by 3x.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Recommended Next Steps</h3>
          <div className="space-y-3">
            {nextSteps?.map((step) => (
              <div
                key={step?.id}
                className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      <Icon name={step?.icon} size={18} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground mb-1">{step?.title}</h4>
                      <p className="text-sm text-muted-foreground">{step?.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-sm font-medium text-primary">+{step?.points} pts</div>
                    </div>
                    {step?.action && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleStepAction(step?.id)}
                      >
                        {step?.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* All Steps Overview */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">All Profile Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {profileSteps?.map((step) => {
              const isCompleted = completedSteps?.has(step?.id);
              return (
                <div
                  key={step?.id}
                  className={`border rounded-lg p-4 transition-all duration-200 ${
                    isCompleted
                      ? 'bg-success/5 border-success/20' :'bg-card border-border hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isCompleted
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {isCompleted ? (
                          <Icon name="Check" size={16} />
                        ) : (
                          <Icon name={step?.icon} size={16} />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-medium mb-1 ${
                          isCompleted ? 'text-success' : 'text-foreground'
                        }`}>
                          {step?.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">{step?.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        isCompleted ? 'text-success' : 'text-primary'
                      }`}>
                        {isCompleted ? '✓' : '+'}{step?.points} pts
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile Strength Indicator */}
        <div className="mt-6 bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-foreground mb-1">Profile Strength</h4>
              <p className="text-sm text-muted-foreground">
                {completionPercentage >= 80 ? 'Excellent' : 
                 completionPercentage >= 60 ? 'Good' : 
                 completionPercentage >= 40 ? 'Fair' : 'Needs Improvement'}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon
                    key={star}
                    name="Star"
                    size={16}
                    className={
                      star <= Math.ceil(completionPercentage / 20)
                        ? 'text-warning fill-current' :'text-muted-foreground'
                    }
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">
                {Math.ceil(completionPercentage / 20)}/5
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;