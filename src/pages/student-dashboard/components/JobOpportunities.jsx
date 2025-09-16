import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const JobOpportunities = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set());

  const jobOpportunities = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      matchScore: 95,
      postedDate: "2024-08-25",
      applicationDeadline: "2024-09-15",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop",
      description: `We're looking for a Senior React Developer to join our innovative team. You'll be working on cutting-edge web applications using React, TypeScript, and modern development practices.\n\nKey responsibilities include architecting scalable frontend solutions, mentoring junior developers, and collaborating with cross-functional teams.`,
      requirements: ["React", "TypeScript", "Node.js", "AWS", "5+ years experience"],
      benefits: ["Health Insurance", "401k", "Remote Work", "Stock Options"],
      smartContractEnabled: true,
      verificationRequired: ["Bachelor\'s Degree", "React Certification"],
      matchedSkills: ["React Development", "AWS Cloud Architecture", "JavaScript"]
    },
    {
      id: 2,
      title: "Cloud Solutions Architect",
      company: "CloudTech Innovations",
      location: "Remote",
      type: "Full-time",
      salary: "$140,000 - $180,000",
      matchScore: 88,
      postedDate: "2024-08-24",
      applicationDeadline: "2024-09-10",
      logo: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=100&h=100&fit=crop",
      description: `Join our cloud infrastructure team as a Solutions Architect. Design and implement scalable cloud solutions for enterprise clients using AWS, Azure, and modern DevOps practices.\n\nYou'll lead technical discussions with clients and guide implementation strategies.`,
      requirements: ["AWS Certification", "Cloud Architecture", "DevOps", "Python", "7+ years experience"],
      benefits: ["Flexible Hours", "Health Insurance", "Learning Budget", "Remote Work"],
      smartContractEnabled: true,
      verificationRequired: ["AWS Solutions Architect Certification", "Bachelor\'s Degree"],
      matchedSkills: ["AWS Cloud Architecture", "Data Science & Analytics"]
    },
    {
      id: 3,
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $120,000",
      matchScore: 82,
      postedDate: "2024-08-23",
      applicationDeadline: "2024-09-20",
      logo: "https://images.pixabay.com/photo-2016/11/29/06/15/plans-1867745_1280.jpg?w=100&h=100&fit=crop",
      description: `We're seeking a talented Frontend Developer to help build our next-generation web platform. Work with React, modern CSS frameworks, and collaborate with our design team.\n\nGreat opportunity for growth in a fast-paced startup environment.`,
      requirements: ["React", "JavaScript", "CSS", "Git", "2+ years experience"],
      benefits: ["Equity", "Health Insurance", "Flexible PTO", "Learning Budget"],
      smartContractEnabled: false,
      verificationRequired: ["Portfolio", "Technical Interview"],
      matchedSkills: ["React Development", "UI/UX Design"]
    },
    {
      id: 4,
      title: "Data Scientist",
      company: "DataDriven Analytics",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      matchScore: 78,
      postedDate: "2024-08-22",
      applicationDeadline: "2024-09-12",
      logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
      description: `Looking for a Data Scientist to join our analytics team. You'll work on machine learning models, data visualization, and statistical analysis to drive business insights.\n\nExperience with Python, R, and cloud platforms preferred.`,
      requirements: ["Python", "Machine Learning", "Statistics", "SQL", "3+ years experience"],
      benefits: ["Health Insurance", "401k", "Professional Development", "Hybrid Work"],
      smartContractEnabled: true,
      verificationRequired: ["Data Science Certification", "Bachelor\'s in STEM"],
      matchedSkills: ["Data Science & Analytics", "Python"]
    },
    {
      id: 5,
      title: "Project Manager",
      company: "Enterprise Solutions Inc",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$95,000 - $125,000",
      matchScore: 75,
      postedDate: "2024-08-21",
      applicationDeadline: "2024-09-18",
      logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=100&h=100&fit=crop",
      description: `We need an experienced Project Manager to lead cross-functional teams and deliver complex software projects. PMP certification preferred.\n\nYou'll manage project timelines, budgets, and stakeholder communications.`,
      requirements: ["PMP Certification", "Agile", "Scrum", "Leadership", "5+ years experience"],
      benefits: ["Health Insurance", "401k", "Bonus", "Professional Development"],
      smartContractEnabled: false,
      verificationRequired: ["PMP Certification", "Project Management Experience"],
      matchedSkills: ["Project Management", "Leadership"]
    }
  ];

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-success bg-success/10 border-success/20';
    if (score >= 80) return 'text-primary bg-primary/10 border-primary/20';
    if (score >= 70) return 'text-warning bg-warning/10 border-warning/20';
    return 'text-muted-foreground bg-muted border-border';
  };

  const handleApplyJob = (jobId) => {
    setAppliedJobs(prev => new Set([...prev, jobId]));
    // Here you would typically trigger smart contract interaction
    console.log(`Applied to job ${jobId} with smart contract`);
  };

  const handleViewJob = (job) => {
    setSelectedJob(job);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
  };

  const isJobApplied = (jobId) => appliedJobs?.has(jobId);

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon name="Briefcase" size={20} className="text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Job Opportunities</h2>
              <p className="text-sm text-muted-foreground">Matched based on your verified skills</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Filter"
            iconPosition="left"
          >
            Filter Jobs
          </Button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {jobOpportunities?.map((job) => (
            <div
              key={job?.id}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-modal transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={job?.logo}
                      alt={job?.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg mb-1">
                          {job?.title}
                        </h3>
                        <p className="text-muted-foreground mb-1">{job?.company}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Icon name="MapPin" size={14} />
                            <span>{job?.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Clock" size={14} />
                            <span>{job?.type}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="DollarSign" size={14} />
                            <span>{job?.salary}</span>
                          </div>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getMatchScoreColor(job?.matchScore)}`}>
                        {job?.matchScore}% Match
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {job?.description?.split('\n')?.[0]}
                </p>
              </div>

              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm font-medium text-foreground">Matched Skills:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {job?.matchedSkills?.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-success/10 text-success text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>Posted {new Date(job.postedDate)?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>Deadline {new Date(job.applicationDeadline)?.toLocaleDateString()}</span>
                  </div>
                  {job?.smartContractEnabled && (
                    <div className="flex items-center space-x-1">
                      <Icon name="Shield" size={12} className="text-primary" />
                      <span className="text-primary">Smart Contract</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Eye"
                    iconPosition="left"
                    onClick={() => handleViewJob(job)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant={isJobApplied(job?.id) ? "secondary" : "default"}
                    size="sm"
                    iconName={isJobApplied(job?.id) ? "Check" : "Send"}
                    iconPosition="left"
                    disabled={isJobApplied(job?.id)}
                    onClick={() => handleApplyJob(job?.id)}
                  >
                    {isJobApplied(job?.id) ? "Applied" : "Apply Now"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {jobOpportunities?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Briefcase" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Job Matches</h3>
            <p className="text-muted-foreground mb-4">
              Complete your profile and add more verified skills to see personalized job recommendations.
            </p>
            <Button variant="default" iconName="Plus" iconPosition="left">
              Complete Profile
            </Button>
          </div>
        )}
      </div>
      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface rounded-lg border border-border shadow-modal max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <Image
                      src={selectedJob?.logo}
                      alt={selectedJob?.company}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-1">
                      {selectedJob?.title}
                    </h3>
                    <p className="text-lg text-muted-foreground">{selectedJob?.company}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="X"
                  onClick={handleCloseModal}
                />
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground text-lg mb-3">Job Description</h4>
                    <div className="prose prose-sm max-w-none">
                      {selectedJob?.description?.split('\n')?.map((paragraph, index) => (
                        <p key={index} className="text-muted-foreground mb-3">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground text-lg mb-3">Requirements</h4>
                    <ul className="space-y-2">
                      {selectedJob?.requirements?.map((requirement, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                          <span className="text-muted-foreground">{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground text-lg mb-3">Benefits</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedJob?.benefits?.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="Gift" size={16} className="text-primary flex-shrink-0" />
                          <span className="text-muted-foreground">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-3">Job Details</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-foreground">Location</label>
                        <p className="text-sm text-muted-foreground">{selectedJob?.location}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Type</label>
                        <p className="text-sm text-muted-foreground">{selectedJob?.type}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Salary</label>
                        <p className="text-sm text-muted-foreground">{selectedJob?.salary}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground">Match Score</label>
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-sm font-medium border ${getMatchScoreColor(selectedJob?.matchScore)}`}>
                          <span>{selectedJob?.matchScore}% Match</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-3">Verification Required</h4>
                    <div className="space-y-2">
                      {selectedJob?.verificationRequired?.map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Icon name="Shield" size={14} className="text-primary flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-3">Matched Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob?.matchedSkills?.map((skill, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-success/10 text-success text-xs rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button
                      variant={isJobApplied(selectedJob?.id) ? "secondary" : "default"}
                      size="lg"
                      iconName={isJobApplied(selectedJob?.id) ? "Check" : "Send"}
                      iconPosition="left"
                      disabled={isJobApplied(selectedJob?.id)}
                      onClick={() => handleApplyJob(selectedJob?.id)}
                      fullWidth
                    >
                      {isJobApplied(selectedJob?.id) ? "Application Submitted" : "Apply with Smart Contract"}
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      iconName="Bookmark"
                      iconPosition="left"
                      fullWidth
                    >
                      Save Job
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

export default JobOpportunities;