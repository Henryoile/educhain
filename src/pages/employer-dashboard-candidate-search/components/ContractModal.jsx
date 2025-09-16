import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ContractModal = ({ isOpen, onClose, candidate, onCreateContract }) => {
  const [contractData, setContractData] = useState({
    position: '',
    salary: '',
    duration: '',
    startDate: '',
    milestones: [
      { name: 'Onboarding & Setup', percentage: 20, amount: 0, description: '' },
      { name: 'First Month Completion', percentage: 40, amount: 0, description: '' },
      { name: 'Mid-term Review', percentage: 70, amount: 0, description: '' },
      { name: 'Project Completion', percentage: 100, amount: 0, description: '' }
    ],
    terms: '',
    escrowAmount: ''
  });

  const [isCreating, setIsCreating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const durationOptions = [
    { value: '3-months', label: '3 Months' },
    { value: '6-months', label: '6 Months' },
    { value: '1-year', label: '1 Year' },
    { value: 'permanent', label: 'Permanent' },
    { value: 'project-based', label: 'Project Based' }
  ];

  const handleInputChange = (field, value) => {
    setContractData(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate milestone amounts when salary changes
      if (field === 'salary' && value) {
        const totalSalary = parseFloat(value) * 1000; // Convert k to actual amount
        updated.milestones = updated?.milestones?.map(milestone => ({
          ...milestone,
          amount: Math.round((totalSalary * milestone?.percentage) / 100)
        }));
        updated.escrowAmount = totalSalary?.toString();
      }
      
      return updated;
    });
  };

  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...contractData?.milestones];
    updatedMilestones[index] = {
      ...updatedMilestones?.[index],
      [field]: value
    };
    
    // Recalculate amounts if percentage changes
    if (field === 'percentage' && contractData?.salary) {
      const totalSalary = parseFloat(contractData?.salary) * 1000;
      updatedMilestones[index].amount = Math.round((totalSalary * parseFloat(value)) / 100);
    }
    
    setContractData(prev => ({
      ...prev,
      milestones: updatedMilestones
    }));
  };

  const handleCreateContract = async () => {
    setIsCreating(true);
    // Simulate smart contract creation
    setTimeout(() => {
      setIsCreating(false);
      onCreateContract({
        ...contractData,
        candidateId: candidate?.id,
        candidateName: candidate?.name
      });
      onClose();
      // Reset form
      setCurrentStep(1);
      setContractData({
        position: '',
        salary: '',
        duration: '',
        startDate: '',
        milestones: [
          { name: 'Onboarding & Setup', percentage: 20, amount: 0, description: '' },
          { name: 'First Month Completion', percentage: 40, amount: 0, description: '' },
          { name: 'Mid-term Review', percentage: 70, amount: 0, description: '' },
          { name: 'Project Completion', percentage: 100, amount: 0, description: '' }
        ],
        terms: '',
        escrowAmount: ''
      });
    }, 3000);
  };

  if (!isOpen || !candidate) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="FileText" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Create Smart Contract</h2>
              <p className="text-sm text-muted-foreground">
                Setting up blockchain contract with {candidate?.name}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-4">
            {[1, 2, 3]?.map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  currentStep >= step 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                <span className={`ml-2 text-sm ${
                  currentStep >= step ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step === 1 ? 'Contract Terms' : step === 2 ? 'Payment Milestones' : 'Review & Deploy'}
                </span>
                {step < 3 && <Icon name="ChevronRight" size={16} className="ml-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep === 1 && (
            <div className="space-y-6">
              {/* Candidate Info */}
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{candidate?.name}</h4>
                    <p className="text-sm text-muted-foreground">{candidate?.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon name="MapPin" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{candidate?.location}</span>
                      <Icon name="Shield" size={12} className="text-success" />
                      <span className="text-xs text-success">Verified</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contract Details */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Position Title"
                  placeholder="e.g. Senior React Developer"
                  value={contractData?.position}
                  onChange={(e) => handleInputChange('position', e?.target?.value)}
                  required
                />
                <Input
                  label="Annual Salary ($k)"
                  type="number"
                  placeholder="120"
                  value={contractData?.salary}
                  onChange={(e) => handleInputChange('salary', e?.target?.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Contract Duration"
                  options={durationOptions}
                  value={contractData?.duration}
                  onChange={(value) => handleInputChange('duration', value)}
                />
                <Input
                  label="Start Date"
                  type="date"
                  value={contractData?.startDate}
                  onChange={(e) => handleInputChange('startDate', e?.target?.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Contract Terms</label>
                <textarea
                  className="w-full h-32 px-3 py-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe work expectations, deliverables, and other terms..."
                  value={contractData?.terms}
                  onChange={(e) => handleInputChange('terms', e?.target?.value)}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Shield" size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Payment Milestones</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Total escrow amount: ${contractData?.escrowAmount ? (parseFloat(contractData?.escrowAmount) / 1000)?.toFixed(0) : '0'}k
                </p>
              </div>

              {contractData?.milestones?.map((milestone, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <Input
                      label={`Milestone ${index + 1} Name`}
                      value={milestone?.name}
                      onChange={(e) => handleMilestoneChange(index, 'name', e?.target?.value)}
                    />
                    <Input
                      label="Percentage"
                      type="number"
                      min="1"
                      max="100"
                      value={milestone?.percentage}
                      onChange={(e) => handleMilestoneChange(index, 'percentage', e?.target?.value)}
                    />
                    <Input
                      label="Amount ($)"
                      type="number"
                      value={milestone?.amount}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <Input
                    label="Description"
                    placeholder="What needs to be completed for this milestone..."
                    value={milestone?.description}
                    onChange={(e) => handleMilestoneChange(index, 'description', e?.target?.value)}
                  />
                </div>
              ))}

              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Info" size={16} className="text-accent" />
                  <span className="text-sm font-medium text-accent">Smart Contract Features</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Automatic escrow of total payment amount</li>
                  <li>• Milestone-based payment release</li>
                  <li>• Dispute resolution mechanism</li>
                  <li>• Performance tracking and verification</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-3">Contract Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Candidate:</span> {candidate?.name}
                  </div>
                  <div>
                    <span className="font-medium">Position:</span> {contractData?.position}
                  </div>
                  <div>
                    <span className="font-medium">Salary:</span> ${contractData?.salary}k/year
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span> {contractData?.duration}
                  </div>
                  <div>
                    <span className="font-medium">Start Date:</span> {contractData?.startDate}
                  </div>
                  <div>
                    <span className="font-medium">Milestones:</span> {contractData?.milestones?.length}
                  </div>
                </div>
              </div>

              <div className="bg-warning/10 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-warning">Blockchain Deployment</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Smart contract will be deployed to Ethereum testnet</li>
                  <li>• Escrow amount: ${contractData?.escrowAmount ? (parseFloat(contractData?.escrowAmount) / 1000)?.toFixed(0) : '0'}k will be locked</li>
                  <li>• Gas fees will be automatically calculated</li>
                  <li>• Contract cannot be modified after deployment</li>
                </ul>
              </div>

              {isCreating && (
                <div className="bg-primary/10 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-primary animate-spin" />
                    <span className="text-sm font-medium text-primary">Deploying Smart Contract...</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Creating blockchain contract and setting up escrow. This may take a few minutes.
                  </p>
                  <div className="mt-3">
                    <div className="w-full bg-border rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-3/4 transition-all duration-300"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-2">
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={() => setCurrentStep(currentStep - 1)}
                iconName="ChevronLeft"
                iconPosition="left"
              >
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>
            
            {currentStep < 3 ? (
              <Button
                variant="default"
                onClick={() => setCurrentStep(currentStep + 1)}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next
              </Button>
            ) : (
              <Button
                variant="default"
                loading={isCreating}
                onClick={handleCreateContract}
                iconName="Zap"
                iconPosition="left"
              >
                {isCreating ? 'Deploying Contract...' : 'Deploy Contract'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractModal;