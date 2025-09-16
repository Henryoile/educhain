import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const JobPostingModal = ({ isOpen, onClose, onCreateJob }) => {
  const [jobData, setJobData] = useState({
    title: '',
    description: '',
    skills: [],
    location: '',
    salary: '',
    experience: '',
    type: 'full-time',
    remote: false,
    milestones: [
      { name: 'Project Setup', percentage: 25, description: '' },
      { name: 'Development Phase', percentage: 50, description: '' },
      { name: 'Testing & Review', percentage: 75, description: '' },
      { name: 'Final Delivery', percentage: 100, description: '' }
    ]
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);

  const skillOptions = [
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'solidity', label: 'Solidity' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'aws', label: 'AWS' }
  ];

  const jobTypeOptions = [
    { value: 'full-time', label: 'Full-time' },
    { value: 'part-time', label: 'Part-time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'internship', label: 'Internship' }
  ];

  const handleInputChange = (field, value) => {
    setJobData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMilestoneChange = (index, field, value) => {
    const updatedMilestones = [...jobData?.milestones];
    updatedMilestones[index] = {
      ...updatedMilestones?.[index],
      [field]: value
    };
    setJobData(prev => ({
      ...prev,
      milestones: updatedMilestones
    }));
  };

  const handleCreateJob = async () => {
    setIsCreating(true);
    // Simulate smart contract creation
    setTimeout(() => {
      setIsCreating(false);
      onCreateJob(jobData);
      onClose();
      setCurrentStep(1);
      setJobData({
        title: '',
        description: '',
        skills: [],
        location: '',
        salary: '',
        experience: '',
        type: 'full-time',
        remote: false,
        milestones: [
          { name: 'Project Setup', percentage: 25, description: '' },
          { name: 'Development Phase', percentage: 50, description: '' },
          { name: 'Testing & Review', percentage: 75, description: '' },
          { name: 'Final Delivery', percentage: 100, description: '' }
        ]
      });
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Plus" size={20} color="white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Create Job Posting</h2>
              <p className="text-sm text-muted-foreground">Set up blockchain-integrated position with smart contracts</p>
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
                  {step === 1 ? 'Job Details' : step === 2 ? 'Smart Contract' : 'Review & Publish'}
                </span>
                {step < 3 && <Icon name="ChevronRight" size={16} className="ml-4 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep === 1 && (
            <div className="space-y-6">
              <Input
                label="Job Title"
                placeholder="e.g. Senior React Developer"
                value={jobData?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                required
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Job Description</label>
                <textarea
                  className="w-full h-32 px-3 py-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe the role, responsibilities, and requirements..."
                  value={jobData?.description}
                  onChange={(e) => handleInputChange('description', e?.target?.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Select
                  label="Job Type"
                  options={jobTypeOptions}
                  value={jobData?.type}
                  onChange={(value) => handleInputChange('type', value)}
                />
                <Input
                  label="Experience Required (years)"
                  type="number"
                  placeholder="3"
                  value={jobData?.experience}
                  onChange={(e) => handleInputChange('experience', e?.target?.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Location"
                  placeholder="San Francisco, CA or Remote"
                  value={jobData?.location}
                  onChange={(e) => handleInputChange('location', e?.target?.value)}
                />
                <Input
                  label="Salary Range ($k)"
                  placeholder="80-120"
                  value={jobData?.salary}
                  onChange={(e) => handleInputChange('salary', e?.target?.value)}
                />
              </div>

              <Select
                label="Required Skills"
                placeholder="Select required skills..."
                multiple
                searchable
                options={skillOptions}
                value={jobData?.skills}
                onChange={(value) => handleInputChange('skills', value)}
              />

              <Checkbox
                label="Remote Work Available"
                checked={jobData?.remote}
                onChange={(e) => handleInputChange('remote', e?.target?.checked)}
              />
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Shield" size={20} className="text-primary" />
                  <h3 className="font-semibold text-foreground">Smart Contract Milestones</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Define payment milestones that will be automatically released upon completion verification.
                </p>
              </div>

              {jobData?.milestones?.map((milestone, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input
                      label={`Milestone ${index + 1} Name`}
                      value={milestone?.name}
                      onChange={(e) => handleMilestoneChange(index, 'name', e?.target?.value)}
                    />
                    <Input
                      label="Payment Percentage"
                      type="number"
                      min="1"
                      max="100"
                      value={milestone?.percentage}
                      onChange={(e) => handleMilestoneChange(index, 'percentage', e?.target?.value)}
                    />
                  </div>
                  <Input
                    label="Description"
                    placeholder="Describe what needs to be completed..."
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
                  <li>• Blockchain verification requirements</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Job Posting Summary</h3>
                <div className="space-y-2 text-sm">
                  <div><span className="font-medium">Title:</span> {jobData?.title}</div>
                  <div><span className="font-medium">Type:</span> {jobData?.type}</div>
                  <div><span className="font-medium">Location:</span> {jobData?.location}</div>
                  <div><span className="font-medium">Salary:</span> ${jobData?.salary}k</div>
                  <div><span className="font-medium">Skills:</span> {jobData?.skills?.join(', ')}</div>
                </div>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Zap" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Blockchain Integration</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Smart contract will be deployed to Ethereum testnet</li>
                  <li>• Total escrow amount: ${jobData?.salary}k</li>
                  <li>• {jobData?.milestones?.length} payment milestones configured</li>
                  <li>• Automatic credential verification required</li>
                </ul>
              </div>

              {isCreating && (
                <div className="bg-warning/10 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-warning animate-spin" />
                    <span className="text-sm font-medium text-warning">Creating Smart Contract...</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Deploying to blockchain and setting up escrow. This may take a few minutes.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
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
                onClick={handleCreateJob}
                iconName="Rocket"
                iconPosition="left"
              >
                {isCreating ? 'Creating Contract...' : 'Publish Job'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPostingModal;