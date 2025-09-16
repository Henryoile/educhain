import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import WalletConnectionCard from './components/WalletConnectionCard';
import TraditionalLoginForm from './components/TraditionalLoginForm';
import RoleSelectionCard from './components/RoleSelectionCard';
import TrustSignals from './components/TrustSignals';
import NetworkSelector from './components/NetworkSelector';

const AuthenticationWalletConnection = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('method'); // method, role, network, connecting
  const [authMethod, setAuthMethod] = useState(null); // wallet, traditional
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState(null);
  const [walletStatus, setWalletStatus] = useState('disconnected'); // disconnected, connecting, connected
  const [walletAddress, setWalletAddress] = useState(null);
  const [showAdvancedNetwork, setShowAdvancedNetwork] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize with default network
  useEffect(() => {
    setSelectedNetwork({
      id: 'sepolia',
      name: 'Sepolia Testnet',
      chainId: '11155111',
      rpcUrl: 'https://sepolia.infura.io/v3/',
      blockExplorer: 'https://sepolia.etherscan.io',
      currency: 'SepoliaETH',
      status: 'active',
      recommended: true,
      color: 'bg-blue-500'
    });
  }, []);

  const handleMethodSelection = (method) => {
    setAuthMethod(method);
    if (method === 'wallet') {
      setCurrentStep('network');
    } else {
      setCurrentStep('role');
    }
    setError(null);
  };

  const handleWalletConnect = async (walletId) => {
    if (!walletId) {
      setWalletStatus('disconnected');
      setWalletAddress(null);
      return;
    }

    setWalletStatus('connecting');
    setIsLoading(true);
    
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAddress = '0x742d35Cc6634C0532925a3b8D0C6964b0C2b32e5';
      setWalletAddress(mockAddress);
      setWalletStatus('connected');
      setCurrentStep('role');
    } catch (err) {
      setError('Failed to connect wallet. Please try again.');
      setWalletStatus('disconnected');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTraditionalLogin = async (loginData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate login process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSelectedRole(loginData?.role);
      handleFinalNavigation(loginData?.role);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (authMethod === 'wallet' && walletStatus === 'connected') {
      handleFinalNavigation(role);
    }
  };

  const handleNetworkChange = (network) => {
    setSelectedNetwork(network);
  };

  const handleFinalNavigation = (role) => {
    const roleRoutes = {
      student: '/student-dashboard',
      institution: '/institution-dashboard',
      employer: '/employer-dashboard-candidate-search'
    };
    
    const targetRoute = roleRoutes?.[role] || '/student-dashboard';
    
    // Simulate final authentication process
    setTimeout(() => {
      navigate(targetRoute);
    }, 1000);
  };

  const handleBack = () => {
    if (currentStep === 'role' && authMethod === 'wallet') {
      setCurrentStep('network');
    } else if (currentStep === 'role' && authMethod === 'traditional') {
      setCurrentStep('method');
    } else if (currentStep === 'network') {
      setCurrentStep('method');
    } else {
      setCurrentStep('method');
    }
    setError(null);
  };

  const renderStepIndicator = () => {
    const steps = [
      { id: 'method', label: 'Method', icon: 'User' },
      { id: 'network', label: 'Network', icon: 'Globe', condition: authMethod === 'wallet' },
      { id: 'role', label: 'Role', icon: 'UserCheck' }
    ]?.filter(step => !step?.condition || step?.condition);

    const currentStepIndex = steps?.findIndex(step => step?.id === currentStep);

    return (
      <div className="flex items-center justify-center space-x-4 mb-8">
        {steps?.map((step, index) => (
          <React.Fragment key={step?.id}>
            <div className={`flex items-center space-x-2 ${
              index <= currentStepIndex ? 'text-primary' : 'text-muted-foreground'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                index <= currentStepIndex ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={step?.icon} size={16} />
              </div>
              <span className="text-sm font-medium hidden sm:block">{step?.label}</span>
            </div>
            {index < steps?.length - 1 && (
              <div className={`w-8 h-0.5 ${
                index < currentStepIndex ? 'bg-primary' : 'bg-border'
              }`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'method':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-foreground">Welcome to EduChain</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Secure, blockchain-powered credential verification platform. 
                Choose your preferred authentication method to get started.
              </p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
              <button
                onClick={() => handleMethodSelection('wallet')}
                className="p-6 border border-border rounded-xl hover:border-primary hover:shadow-sm transition-all duration-200 text-left bg-surface"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Wallet" size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Wallet Connection</h3>
                    <p className="text-muted-foreground mt-2">
                      Connect your crypto wallet for full blockchain integration and secure credential storage.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-primary">
                    <Icon name="ArrowRight" size={16} />
                    <span>Recommended for full features</span>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleMethodSelection('traditional')}
                className="p-6 border border-border rounded-xl hover:border-primary hover:shadow-sm transition-all duration-200 text-left bg-surface"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                    <Icon name="Mail" size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Email & Password</h3>
                    <p className="text-muted-foreground mt-2">
                      Use traditional email and password authentication for quick access to basic features.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-secondary">
                    <Icon name="ArrowRight" size={16} />
                    <span>Quick access option</span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        );

      case 'network':
        return (
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Select Blockchain Network</h2>
              <p className="text-muted-foreground">
                Choose the blockchain network for your wallet connection
              </p>
            </div>
            
            <NetworkSelector
              selectedNetwork={selectedNetwork}
              onNetworkChange={handleNetworkChange}
              showAdvanced={showAdvancedNetwork}
              onToggleAdvanced={() => setShowAdvancedNetwork(!showAdvancedNetwork)}
            />
            
            <div className="flex justify-center">
              <Button
                onClick={() => setCurrentStep('connecting')}
                disabled={!selectedNetwork}
                iconName="ArrowRight"
                iconPosition="right"
              >
                Continue with {selectedNetwork?.name}
              </Button>
            </div>
          </div>
        );

      case 'connecting':
        return (
          <div className="space-y-8 max-w-lg mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Connect Your Wallet</h2>
              <p className="text-muted-foreground">
                Connect to {selectedNetwork?.name} network
              </p>
            </div>
            
            <WalletConnectionCard
              onWalletConnect={handleWalletConnect}
              connectionStatus={walletStatus}
              walletAddress={walletAddress}
            />
          </div>
        );

      case 'role':
        return (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                {authMethod === 'wallet' ? 'Almost There!' : 'Choose Your Role'}
              </h2>
              <p className="text-muted-foreground">
                {authMethod === 'wallet' 
                  ? 'Select your role to complete the setup' :'How will you be using EduChain?'
                }
              </p>
            </div>
            
            {authMethod === 'traditional' ? (
              <div className="grid gap-8 lg:grid-cols-2">
                <TraditionalLoginForm
                  onLogin={handleTraditionalLogin}
                  isLoading={isLoading}
                />
                <RoleSelectionCard
                  onRoleSelect={handleRoleSelect}
                  selectedRole={selectedRole}
                />
              </div>
            ) : (
              <RoleSelectionCard
                onRoleSelect={handleRoleSelect}
                selectedRole={selectedRole}
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-surface border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="GraduationCap" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">EduChain</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} />
                <span>Secured by Blockchain</span>
              </div>
              
              {currentStep !== 'method' && (
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-error/10 border border-error/20 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error flex-shrink-0" />
                <span className="text-sm text-error">{error}</span>
              </div>
            </div>
          </div>
        )}

        {/* Current Step Content */}
        <div className="space-y-12">
          {renderCurrentStep()}
          
          {/* Trust Signals - Show on method selection step */}
          {currentStep === 'method' && (
            <div className="max-w-4xl mx-auto">
              <TrustSignals />
            </div>
          )}
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} EduChain. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthenticationWalletConnection;