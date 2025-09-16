import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters, resultCount }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const skillOptions = [
    { value: 'react', label: 'React' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'python', label: 'Python' },
    { value: 'blockchain', label: 'Blockchain' },
    { value: 'solidity', label: 'Solidity' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'aws', label: 'AWS' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' }
  ];

  const educationOptions = [
    { value: 'high-school', label: 'High School' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'PhD' },
    { value: 'bootcamp', label: 'Bootcamp' },
    { value: 'certification', label: 'Professional Certification' }
  ];

  const locationOptions = [
    { value: 'remote', label: 'Remote' },
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'canada', label: 'Canada' },
    { value: 'germany', label: 'Germany' },
    { value: 'australia', label: 'Australia' },
    { value: 'singapore', label: 'Singapore' },
    { value: 'india', label: 'India' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Search Filters</h3>
          <div className="px-2 py-1 bg-primary/10 text-primary text-sm rounded-full">
            {resultCount} candidates
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            iconPosition="left"
          >
            Clear All
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
          />
        </div>
      </div>
      {/* Filter Content */}
      {isExpanded && (
        <div className="p-4 space-y-6">
          {/* Search Query */}
          <div>
            <Input
              label="Search Keywords"
              type="search"
              placeholder="Job title, skills, company..."
              value={filters?.query || ''}
              onChange={(e) => handleFilterChange('query', e?.target?.value)}
              className="mb-0"
            />
          </div>

          {/* Skills Filter */}
          <div>
            <Select
              label="Required Skills"
              placeholder="Select skills..."
              multiple
              searchable
              clearable
              options={skillOptions}
              value={filters?.skills || []}
              onChange={(value) => handleFilterChange('skills', value)}
            />
          </div>

          {/* Experience Range */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Experience (years)"
              type="number"
              placeholder="0"
              min="0"
              max="50"
              value={filters?.minExperience || ''}
              onChange={(e) => handleFilterChange('minExperience', e?.target?.value)}
            />
            <Input
              label="Max Experience (years)"
              type="number"
              placeholder="20"
              min="0"
              max="50"
              value={filters?.maxExperience || ''}
              onChange={(e) => handleFilterChange('maxExperience', e?.target?.value)}
            />
          </div>

          {/* Education Level */}
          <div>
            <Select
              label="Education Level"
              placeholder="Select education level..."
              multiple
              options={educationOptions}
              value={filters?.education || []}
              onChange={(value) => handleFilterChange('education', value)}
            />
          </div>

          {/* Location */}
          <div>
            <Select
              label="Location"
              placeholder="Select locations..."
              multiple
              searchable
              options={locationOptions}
              value={filters?.location || []}
              onChange={(value) => handleFilterChange('location', value)}
            />
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Salary ($k)"
              type="number"
              placeholder="50"
              min="0"
              max="500"
              value={filters?.minSalary || ''}
              onChange={(e) => handleFilterChange('minSalary', e?.target?.value)}
            />
            <Input
              label="Max Salary ($k)"
              type="number"
              placeholder="200"
              min="0"
              max="500"
              value={filters?.maxSalary || ''}
              onChange={(e) => handleFilterChange('maxSalary', e?.target?.value)}
            />
          </div>

          {/* Verification Status */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Verification Status</label>
            <div className="space-y-2">
              <Checkbox
                label="Blockchain Verified Only"
                checked={filters?.blockchainVerified || false}
                onChange={(e) => handleFilterChange('blockchainVerified', e?.target?.checked)}
              />
              <Checkbox
                label="Institution Verified"
                checked={filters?.institutionVerified || false}
                onChange={(e) => handleFilterChange('institutionVerified', e?.target?.checked)}
              />
              <Checkbox
                label="Skills Verified"
                checked={filters?.skillsVerified || false}
                onChange={(e) => handleFilterChange('skillsVerified', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Availability */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Availability</label>
            <div className="space-y-2">
              <Checkbox
                label="Available Immediately"
                checked={filters?.immediateAvailability || false}
                onChange={(e) => handleFilterChange('immediateAvailability', e?.target?.checked)}
              />
              <Checkbox
                label="Open to Remote Work"
                checked={filters?.remoteWork || false}
                onChange={(e) => handleFilterChange('remoteWork', e?.target?.checked)}
              />
              <Checkbox
                label="Open to Relocation"
                checked={filters?.relocation || false}
                onChange={(e) => handleFilterChange('relocation', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Apply Filters Button */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="default"
              fullWidth
              iconName="Search"
              iconPosition="left"
            >
              Apply Filters ({resultCount} results)
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilters;