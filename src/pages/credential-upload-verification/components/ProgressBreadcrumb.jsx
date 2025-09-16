import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressBreadcrumb = ({ currentStep, steps }) => {
  const defaultSteps = [
    { id: 1, name: 'Upload Document', icon: 'Upload' },
    { id: 2, name: 'Document Preview', icon: 'Eye' },
    { id: 3, name: 'Credential Details', icon: 'FileText' },
    { id: 4, name: 'Blockchain Storage', icon: 'Zap' },
    { id: 5, name: 'Verification Complete', icon: 'CheckCircle' }
  ];

  const workflowSteps = steps || defaultSteps;

  const getStepStatus = (stepId) => {
    if (stepId < currentStep) return 'completed';
    if (stepId === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (status) => {
    return status === 'completed' ? 'bg-success' : 'bg-border';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Upload Progress</h2>
        <span className="text-sm text-muted-foreground">
          Step {currentStep} of {workflowSteps?.length}
        </span>
      </div>
      {/* Desktop Progress */}
      <div className="hidden md:flex items-center justify-between">
        {workflowSteps?.map((step, index) => {
          const status = getStepStatus(step?.id);
          const isLast = index === workflowSteps?.length - 1;

          return (
            <div key={step?.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${getStepClasses(status)}`}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    <Icon name={step?.icon} size={16} />
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed'? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step?.name}
                  </p>
                </div>
              </div>
              {/* Connector Line */}
              {!isLast && (
                <div className="flex-1 mx-4">
                  <div className={`h-0.5 transition-all duration-200 ${getConnectorClasses(status)}`}></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Mobile Progress */}
      <div className="md:hidden">
        <div className="space-y-3">
          {workflowSteps?.map((step) => {
            const status = getStepStatus(step?.id);

            return (
              <div key={step?.id} className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${getStepClasses(status)}`}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={14} />
                  ) : (
                    <Icon name={step?.icon} size={14} />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed'? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {step?.name}
                  </p>
                </div>
                {status === 'current' && (
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Mobile Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / workflowSteps?.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Current Step Description */}
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Current Step:</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          {currentStep === 1 && "Upload your credential document securely to our IPFS storage system."}
          {currentStep === 2 && "Review and verify your document before proceeding to metadata entry."}
          {currentStep === 3 && "Provide detailed information about your credential for blockchain verification."}
          {currentStep === 4 && "Submit your credential to the blockchain for permanent, tamper-proof storage."}
          {currentStep === 5 && "Your credential has been successfully verified and stored on the blockchain."}
        </p>
      </div>
    </div>
  );
};

export default ProgressBreadcrumb;