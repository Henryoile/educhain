import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar, { UserProvider } from '../../components/ui/Sidebar';
import ProgressBreadcrumb from './components/ProgressBreadcrumb';
import UploadZone from './components/UploadZone';
import DocumentPreview from './components/DocumentPreview';
import CredentialMetadataForm from './components/CredentialMetadataForm';
import BlockchainTransaction from './components/BlockchainTransaction';
import VerificationStatusTracker from './components/VerificationStatusTracker';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CredentialUploadVerification = () => {
  const location = useLocation();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Upload workflow state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [credentialMetadata, setCredentialMetadata] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const [isProcessingMetadata, setIsProcessingMetadata] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate file upload progress
    const uploadInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setIsUploading(false);
          setCurrentStep(2);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setCurrentStep(1);
    setUploadProgress(0);
  };

  const handleMetadataSubmit = (metadata) => {
    setIsProcessingMetadata(true);
    setCredentialMetadata(metadata);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessingMetadata(false);
      setCurrentStep(4);
    }, 1500);
  };

  const handleTransactionComplete = (txData) => {
    setTransactionData(txData);
    setCurrentStep(5);
  };

  const handleVerificationComplete = () => {
    // Navigate to dashboard or credential portfolio
    window.location.href = '/student-dashboard';
  };

  const handleContinueToMetadata = () => {
    setCurrentStep(3);
  };

  const renderCurrentStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <UploadZone
            onFileSelect={handleFileSelect}
            uploadProgress={uploadProgress}
            isUploading={isUploading}
          />
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <DocumentPreview
              file={selectedFile}
              onRemove={handleFileRemove}
            />
            <div className="flex justify-end">
              <Button
                variant="default"
                onClick={handleContinueToMetadata}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Continue to Details
              </Button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <CredentialMetadataForm
            onSubmit={handleMetadataSubmit}
            isSubmitting={isProcessingMetadata}
          />
        );
      
      case 4:
        return (
          <BlockchainTransaction
            file={selectedFile}
            metadata={credentialMetadata}
            onTransactionComplete={handleTransactionComplete}
          />
        );
      
      case 5:
        return (
          <VerificationStatusTracker
            transactionData={transactionData}
            onComplete={handleVerificationComplete}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <UserProvider role="student" walletConnected={true} transactionCount={1}>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header 
          onMenuToggle={handleMobileMenuToggle}
          isMenuOpen={isMobileMenuOpen}
        />

        <div className="flex">
          {/* Sidebar */}
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggle={handleSidebarToggle}
          />

          {/* Main Content */}
          <main 
            className={`flex-1 transition-all duration-300 ease-in-out ${
              isSidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
            }`}
          >
            <div className="p-6 max-w-4xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Upload" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-foreground">
                      Credential Upload & Verification
                    </h1>
                    <p className="text-muted-foreground">
                      Securely upload and verify your academic credentials on the blockchain
                    </p>
                  </div>
                </div>

                {/* Navigation Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <a href="/student-dashboard" className="hover:text-foreground transition-colors">
                    Dashboard
                  </a>
                  <Icon name="ChevronRight" size={16} />
                  <span className="text-foreground font-medium">Upload Credential</span>
                </nav>
              </div>

              {/* Progress Breadcrumb */}
              <ProgressBreadcrumb 
                currentStep={currentStep} 
                steps={[
                  { id: 1, title: 'Upload Document', description: 'Select and upload your credential' },
                  { id: 2, title: 'Preview', description: 'Review uploaded document' },
                  { id: 3, title: 'Details', description: 'Enter credential metadata' },
                  { id: 4, title: 'Blockchain', description: 'Process on blockchain' },
                  { id: 5, title: 'Verification', description: 'Complete verification' }
                ]}
              />

              {/* Main Content Area */}
              <div className="space-y-6">
                {renderCurrentStepContent()}
              </div>

              {/* Help Section */}
              {currentStep < 5 && (
                <div className="mt-8 bg-surface border border-border rounded-lg p-6">
                  <div className="flex items-start space-x-3">
                    <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-foreground">Need Help?</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentStep === 1 && "Ensure your document is clear, complete, and in an accepted format (PDF, JPG, PNG, DOC, DOCX)."}
                        {currentStep === 2 && "Review your document carefully. You can zoom, rotate, and verify all information is visible and correct."}
                        {currentStep === 3 && "Provide accurate information as it will be permanently stored on the blockchain and cannot be modified."}
                        {currentStep === 4 && "Your credential is being securely processed and stored on the blockchain. This may take a few minutes."}
                      </p>
                      <div className="flex space-x-3 mt-3">
                        <Button variant="ghost" size="sm" iconName="MessageCircle">
                          Live Chat Support
                        </Button>
                        <Button variant="ghost" size="sm" iconName="FileText">
                          Upload Guidelines
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </UserProvider>
  );
};

export default CredentialUploadVerification;