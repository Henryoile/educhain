import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SkillsShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const skillCategories = [
    { id: 'all', label: 'All Skills', icon: 'Grid3X3' },
    { id: 'technical', label: 'Technical', icon: 'Code' },
    { id: 'design', label: 'Design', icon: 'Palette' },
    { id: 'business', label: 'Business', icon: 'Briefcase' },
    { id: 'language', label: 'Languages', icon: 'Globe' }
  ];

  const skills = [
    {
      id: 1,
      name: "React Development",
      category: "technical",
      level: "Expert",
      progress: 95,
      verifiedBy: "Meta",
      platform: "Coursera",
      completionDate: "2024-01-15",
      certificateUrl: "https://coursera.org/verify/ABC123",
      projects: 12,
      icon: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100&h=100&fit=crop",
      badges: ["Certified", "Blockchain Verified"]
    },
    {
      id: 2,
      name: "AWS Cloud Architecture",
      category: "technical",
      level: "Advanced",
      progress: 88,
      verifiedBy: "Amazon Web Services",
      platform: "AWS Training",
      completionDate: "2024-03-20",
      certificateUrl: "https://aws.amazon.com/verify/DEF456",
      projects: 8,
      icon: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?w=100&h=100&fit=crop",
      badges: ["AWS Certified", "Industry Recognized"]
    },
    {
      id: 3,
      name: "UI/UX Design",
      category: "design",
      level: "Intermediate",
      progress: 72,
      verifiedBy: "Adobe",
      platform: "Adobe Creative Cloud",
      completionDate: "2023-11-10",
      certificateUrl: "https://adobe.com/verify/GHI789",
      projects: 15,
      icon: "https://images.pixabay.com/photo/2016/11/29/06/15/plans-1867745_1280.jpg?w=100&h=100&fit=crop",
      badges: ["Adobe Certified"]
    },
    {
      id: 4,
      name: "Data Science & Analytics",
      category: "technical",
      level: "Advanced",
      progress: 85,
      verifiedBy: "Johns Hopkins University",
      platform: "Coursera",
      completionDate: "2023-12-05",
      certificateUrl: "https://coursera.org/verify/JKL012",
      projects: 6,
      icon: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
      badges: ["University Verified", "Blockchain Verified"]
    },
    {
      id: 5,
      name: "Project Management",
      category: "business",
      level: "Intermediate",
      progress: 78,
      verifiedBy: "PMI",
      platform: "PMI Learning",
      completionDate: "2024-02-28",
      certificateUrl: "https://pmi.org/verify/MNO345",
      projects: 4,
      icon: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?w=100&h=100&fit=crop",
      badges: ["PMI Certified"]
    },
    {
      id: 6,
      name: "Spanish (Conversational)",
      category: "language",
      level: "Intermediate",
      progress: 65,
      verifiedBy: "Duolingo",
      platform: "Duolingo",
      completionDate: "2024-01-30",
      certificateUrl: "https://duolingo.com/verify/PQR678",
      projects: 0,
      icon: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&h=100&fit=crop",
      badges: ["Language Certified"]
    }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills?.filter(skill => skill?.category === selectedCategory);

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'expert': return 'text-success bg-success/10 border-success/20';
      case 'advanced': return 'text-primary bg-primary/10 border-primary/20';
      case 'intermediate': return 'text-warning bg-warning/10 border-warning/20';
      case 'beginner': return 'text-muted-foreground bg-muted border-border';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 90) return 'bg-success';
    if (progress >= 70) return 'bg-primary';
    if (progress >= 50) return 'bg-warning';
    return 'bg-muted-foreground';
  };

  return (
    <div className="bg-surface rounded-lg border border-border shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="Trophy" size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Skills Showcase</h2>
              <p className="text-sm text-muted-foreground">Verified achievements and competencies</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            iconPosition="left"
          >
            Add Skill
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {skillCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills?.map((skill) => (
            <div
              key={skill?.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-modal transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={skill?.icon}
                      alt={skill?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-sm mb-1 truncate">
                      {skill?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {skill?.platform}
                    </p>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getLevelColor(skill?.level)}`}>
                  {skill?.level}
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Progress</span>
                  <span className="text-xs font-medium text-foreground">{skill?.progress}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(skill?.progress)}`}
                    style={{ width: `${skill?.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {skill?.badges?.map((badge, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full flex items-center space-x-1"
                    >
                      <Icon name="Shield" size={10} />
                      <span>{badge}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Verified by:</span>
                  <span className="font-medium text-foreground">{skill?.verifiedBy}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Completed:</span>
                  <span className="font-medium text-foreground">
                    {new Date(skill.completionDate)?.toLocaleDateString()}
                  </span>
                </div>
                {skill?.projects > 0 && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Projects:</span>
                    <span className="font-medium text-foreground">{skill?.projects}</span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="xs"
                  iconName="ExternalLink"
                  iconPosition="left"
                  className="flex-1"
                >
                  Certificate
                </Button>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Share"
                  iconPosition="left"
                  className="flex-1"
                >
                  Share
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Trophy" size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No Skills Found</h3>
            <p className="text-muted-foreground mb-4">
              {selectedCategory === 'all' ?'Start showcasing your skills by connecting your learning platforms.'
                : `No ${selectedCategory} skills found. Try a different category.`
              }
            </p>
            <Button variant="default" iconName="Plus" iconPosition="left">
              Connect Platform
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsShowcase;