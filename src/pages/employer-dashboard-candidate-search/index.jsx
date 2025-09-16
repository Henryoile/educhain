import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import CandidateCard from './components/CandidateCard';
import SearchFilters from './components/SearchFilters';
import JobPostingModal from './components/JobPostingModal';
import TalentAnalytics from './components/TalentAnalytics';
import QRScanner from './components/QRScanner';
import ContractModal from './components/ContractModal';

const EmployerDashboardCandidateSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isQRScannerOpen, setIsQRScannerOpen] = useState(false);
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [notifications, setNotifications] = useState([]);

  // Mock candidates data
  const mockCandidates = [
    {
      id: 'cand_001',
      name: 'Sarah Johnson',
      title: 'Senior React Developer',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      location: 'San Francisco, CA',
      experience: 5,
      expectedSalary: 120,
      skillMatch: 92,
      skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker'],
      education: 'MS Computer Science',
      certifications: 8,
      isVerified: true,
      lastVerified: '2 days ago'
    },
    {
      id: 'cand_002',
      name: 'Michael Chen',
      title: 'Blockchain Developer',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      location: 'Remote',
      experience: 4,
      expectedSalary: 110,
      skillMatch: 88,
      skills: ['Solidity', 'Web3', 'React', 'Python', 'Ethereum'],
      education: 'BS Software Engineering',
      certifications: 6,
      isVerified: true,
      lastVerified: '1 day ago'
    },
    {
      id: 'cand_003',
      name: 'Emily Rodriguez',
      title: 'Full Stack Engineer',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      location: 'New York, NY',
      experience: 6,
      expectedSalary: 130,
      skillMatch: 85,
      skills: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Kubernetes'],
      education: 'BS Computer Science',
      certifications: 10,
      isVerified: true,
      lastVerified: '3 hours ago'
    },
    {
      id: 'cand_004',
      name: 'David Kim',
      title: 'DevOps Engineer',
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
      location: 'Seattle, WA',
      experience: 7,
      expectedSalary: 140,
      skillMatch: 78,
      skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins'],
      education: 'MS Information Systems',
      certifications: 12,
      isVerified: true,
      lastVerified: '5 hours ago'
    },
    {
      id: 'cand_005',
      name: 'Lisa Thompson',
      title: 'Frontend Developer',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
      location: 'Austin, TX',
      experience: 3,
      expectedSalary: 95,
      skillMatch: 82,
      skills: ['React', 'Vue.js', 'JavaScript', 'CSS', 'Figma'],
      education: 'BS Web Design',
      certifications: 5,
      isVerified: true,
      lastVerified: '1 day ago'
    },
    {
      id: 'cand_006',
      name: 'James Wilson',
      title: 'Backend Developer',
      avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
      location: 'Chicago, IL',
      experience: 4,
      expectedSalary: 105,
      skillMatch: 75,
      skills: ['Node.js', 'Python', 'MongoDB', 'Redis', 'GraphQL'],
      education: 'BS Computer Engineering',
      certifications: 7,
      isVerified: true,
      lastVerified: '6 hours ago'
    }
  ];

  const [candidates, setCandidates] = useState(mockCandidates);
  const [filteredCandidates, setFilteredCandidates] = useState(mockCandidates);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match' },
    { value: 'experience', label: 'Experience' },
    { value: 'salary', label: 'Salary' },
    { value: 'verified', label: 'Recently Verified' }
  ];

  // Filter and search candidates
  useEffect(() => {
    let filtered = [...candidates];

    // Apply search query
    if (searchQuery) {
      filtered = filtered?.filter(candidate =>
        candidate?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        candidate?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
        candidate?.skills?.some(skill => skill?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
      );
    }

    // Apply filters
    if (filters?.skills && filters?.skills?.length > 0) {
      filtered = filtered?.filter(candidate =>
        filters?.skills?.some(skill => 
          candidate?.skills?.some(candidateSkill => 
            candidateSkill?.toLowerCase()?.includes(skill?.toLowerCase())
          )
        )
      );
    }

    if (filters?.minExperience) {
      filtered = filtered?.filter(candidate => candidate?.experience >= parseInt(filters?.minExperience));
    }

    if (filters?.maxExperience) {
      filtered = filtered?.filter(candidate => candidate?.experience <= parseInt(filters?.maxExperience));
    }

    if (filters?.minSalary) {
      filtered = filtered?.filter(candidate => candidate?.expectedSalary >= parseInt(filters?.minSalary));
    }

    if (filters?.maxSalary) {
      filtered = filtered?.filter(candidate => candidate?.expectedSalary <= parseInt(filters?.maxSalary));
    }

    // Apply sorting
    switch (sortBy) {
      case 'experience':
        filtered?.sort((a, b) => b?.experience - a?.experience);
        break;
      case 'salary':
        filtered?.sort((a, b) => b?.expectedSalary - a?.expectedSalary);
        break;
      case 'verified':
        filtered?.sort((a, b) => new Date(b.lastVerified) - new Date(a.lastVerified));
        break;
      default:
        filtered?.sort((a, b) => b?.skillMatch - a?.skillMatch);
    }

    setFilteredCandidates(filtered);
  }, [candidates, searchQuery, filters, sortBy]);

  const handleViewProfile = (candidateId) => {
    const candidate = candidates?.find(c => c?.id === candidateId);
    console.log('Viewing profile for:', candidate?.name);
    // Navigate to candidate profile page
  };

  const handleVerifyCredentials = (candidateId) => {
    console.log('Verifying credentials for candidate:', candidateId);
    // Add notification
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      message: 'Credentials verified successfully on blockchain',
      timestamp: new Date()
    }]);
  };

  const handleStartContract = (candidateId) => {
    const candidate = candidates?.find(c => c?.id === candidateId);
    setSelectedCandidate(candidate);
    setIsContractModalOpen(true);
  };

  const handleCreateJob = (jobData) => {
    console.log('Creating job:', jobData);
    // Add notification
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      message: 'Job posting created and smart contract deployed successfully',
      timestamp: new Date()
    }]);
  };

  const handleCreateContract = (contractData) => {
    console.log('Creating contract:', contractData);
    // Add notification
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      message: `Smart contract created with ${contractData?.candidateName}`,
      timestamp: new Date()
    }]);
  };

  const handleQRScanResult = (scanResult) => {
    console.log('QR Scan result:', scanResult);
    // Add notification
    setNotifications(prev => [...prev, {
      id: Date.now(),
      type: 'success',
      message: `Verified credentials for ${scanResult?.name}`,
      timestamp: new Date()
    }]);
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Talent Discovery Hub
              </h1>
              <p className="text-muted-foreground">
                Find verified candidates with blockchain-authenticated credentials
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setIsQRScannerOpen(true)}
                iconName="QrCode"
                iconPosition="left"
              >
                QR Scanner
              </Button>
              <Button
                variant="default"
                onClick={() => setIsJobModalOpen(true)}
                iconName="Plus"
                iconPosition="left"
              >
                Post Job
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex-1 relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, skills, or job title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pl-10"
              />
            </div>
            <Select
              placeholder="Sort by..."
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              className="w-48"
            />
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
              iconName="Grid3X3"
            />
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
              iconName="List"
            />
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} className="text-primary" />
                <span className="text-sm font-medium text-foreground">Total Candidates</span>
              </div>
              <div className="text-2xl font-bold text-foreground mt-1">{filteredCandidates?.length}</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} className="text-success" />
                <span className="text-sm font-medium text-foreground">Verified</span>
              </div>
              <div className="text-2xl font-bold text-foreground mt-1">
                {filteredCandidates?.filter(c => c?.isVerified)?.length}
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="TrendingUp" size={20} className="text-accent" />
                <span className="text-sm font-medium text-foreground">Avg Match</span>
              </div>
              <div className="text-2xl font-bold text-foreground mt-1">
                {Math.round(filteredCandidates?.reduce((acc, c) => acc + c?.skillMatch, 0) / filteredCandidates?.length)}%
              </div>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={20} className="text-warning" />
                <span className="text-sm font-medium text-foreground">Avg Salary</span>
              </div>
              <div className="text-2xl font-bold text-foreground mt-1">
                ${Math.round(filteredCandidates?.reduce((acc, c) => acc + c?.expectedSalary, 0) / filteredCandidates?.length)}k
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <SearchFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
              resultCount={filteredCandidates?.length}
            />
          </div>

          {/* Candidates List */}
          <div className="lg:col-span-3">
            <div className="space-y-6">
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Search Results ({filteredCandidates?.length})
                </h2>
                {filteredCandidates?.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Showing {filteredCandidates?.length} of {candidates?.length} candidates
                  </div>
                )}
              </div>

              {/* Candidates Grid/List */}
              {filteredCandidates?.length > 0 ? (
                <div className={viewMode === 'grid' ? 'grid grid-cols-1 xl:grid-cols-2 gap-6' : 'space-y-4'}>
                  {filteredCandidates?.map((candidate) => (
                    <CandidateCard
                      key={candidate?.id}
                      candidate={candidate}
                      onViewProfile={handleViewProfile}
                      onVerifyCredentials={handleVerifyCredentials}
                      onStartContract={handleStartContract}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No candidates found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Analytics Section */}
        <div className="mt-12">
          <TalentAnalytics />
        </div>
      </div>
      {/* Notifications */}
      {notifications?.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications?.slice(-3)?.map((notification) => (
            <div
              key={notification?.id}
              className={`p-4 rounded-lg shadow-lg border max-w-sm ${
                notification?.type === 'success' ?'bg-success/10 border-success text-success' :'bg-error/10 border-error text-error'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon 
                  name={notification?.type === 'success' ? 'CheckCircle' : 'AlertCircle'} 
                  size={16} 
                />
                <span className="text-sm font-medium">{notification?.message}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setNotifications(prev => prev?.filter(n => n?.id !== notification?.id))}
                  iconName="X"
                  className="ml-auto h-6 w-6"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Modals */}
      <JobPostingModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        onCreateJob={handleCreateJob}
      />
      <QRScanner
        isOpen={isQRScannerOpen}
        onClose={() => setIsQRScannerOpen(false)}
        onScanResult={handleQRScanResult}
      />
      <ContractModal
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        candidate={selectedCandidate}
        onCreateContract={handleCreateContract}
      />
    </div>
  );
};

export default EmployerDashboardCandidateSearch;