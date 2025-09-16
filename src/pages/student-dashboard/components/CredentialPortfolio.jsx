import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CredentialPortfolio = () => {
  const [selectedCredential, setSelectedCredential] = useState(null);

  const credentials = [
    {
      id: 1,
      title: "Bachelor of Computer Science",
      institution: "Stanford University",
      issueDate: "2024-05-15",
      verificationStatus: "verified",
      blockchainHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
      credentialType: "degree",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
      skills: ["Computer Science", "Software Engineering", "Data Structures"]
    },
    {
      id: 2,
      title: "AWS Solutions Architect",
      institution: "Amazon Web Services",
      issueDate: "2024-03-20",
      verificationStatus: "verified",
      blockchainHash: "0x2b3c4d5e6f7890abcdef1234567890ab",
      credentialType: "certification",
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=400&h=300&fit=crop",
      skills: ["Cloud Computing", "AWS", "System Architecture"]
    },
    {
      id: 3,
      title: "React Developer Certification",
      institution: "Meta",
      issueDate: "2024-01-10",
      verificationStatus: "pending",
      blockchainHash: "0x3c4d5e6f7890abcdef1234567890abcd",
      credentialType: "certification",
      image: "https://images.pixabay.com/photo/2016/11/19/14/00/code-1839406_1280.jpg?w=400&h=300&fit=crop",
      skills: ["React", "JavaScript", "Frontend Development"]
    },
    {
      id: 4,
      title: "Data Science Specialization",
      institution: "Johns Hopkins University",
      issueDate: "2023-11-25",
      verificationStatus: "verified",
      blockchainHash: "0x4d5e6f7890abcdef1234567890abcdef",
      credentialType: "course",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      skills: ["Data Science", "Machine Learning", "Python", "Statistics"]
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success/10 border-success/20';
      case 'pending': return 'text-warning bg-warning/10 border-warning/20';
      case 'failed': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'failed': return 'XCircle';
      default: return 'AlertCircle';
    }
  };

  const handleViewCredential = (credential) => {
    setSelectedCredential(credential);
  };

  const handleCloseModal = () => {
    setSelectedCredential(null);
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Award" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Credential Portfolio</h2>
              <p className="text-sm text-muted-foreground">Your verified academic achievements</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            Add Credential
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials?.map((credential) => (
            <div
              key={credential?.id}
              className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-modal transition-all duration-200 cursor-pointer"
              onClick={() => handleViewCredential(credential)}
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={credential?.image}
                  alt={credential?.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(credential?.verificationStatus)}`}>
                    <div className="flex items-center space-x-1">
                      <Icon name={getStatusIcon(credential?.verificationStatus)} size={12} />
                      <span className="capitalize">{credential?.verificationStatus}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-foreground text-sm mb-1 line-clamp-2">
                    {credential?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {credential?.institution}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Issued: {new Date(credential.issueDate)?.toLocaleDateString()}
                  </p>
                </div>

                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {credential?.skills?.slice(0, 2)?.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {credential?.skills?.length > 2 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        +{credential?.skills?.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={14} className="text-primary" />
                    <span className="text-xs text-primary font-medium">Blockchain Verified</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="ExternalLink"
                    iconPosition="right"
                  >
                    View
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {credentials?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Award" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Credentials Yet</h3>
            <p className="text-muted-foreground mb-4">
              Start building your credential portfolio by uploading your first certificate.
            </p>
            <Button variant="default" iconName="Plus" iconPosition="left">
              Upload First Credential
            </Button>
          </div>
        )}
      </div>
      {/* Credential Detail Modal */}
      {selectedCredential && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg border border-border shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Credential Details</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  onClick={handleCloseModal}
                />
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={selectedCredential?.image}
                    alt={selectedCredential?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground text-lg mb-1">
                      {selectedCredential?.title}
                    </h4>
                    <p className="text-muted-foreground">
                      {selectedCredential?.institution}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground">Issue Date</label>
                      <p className="text-sm text-muted-foreground">
                        {new Date(selectedCredential.issueDate)?.toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground">Status</label>
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedCredential?.verificationStatus)}`}>
                        <Icon name={getStatusIcon(selectedCredential?.verificationStatus)} size={12} />
                        <span className="capitalize">{selectedCredential?.verificationStatus}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Skills & Competencies</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedCredential?.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Blockchain Hash</label>
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm font-mono text-muted-foreground break-all">
                        {selectedCredential?.blockchainHash}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      variant="default"
                      iconName="ExternalLink"
                      iconPosition="left"
                      className="flex-1"
                    >
                      View on Blockchain
                    </Button>
                    <Button
                      variant="outline"
                      iconName="Share"
                      iconPosition="left"
                      className="flex-1"
                    >
                      Share Credential
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialPortfolio;