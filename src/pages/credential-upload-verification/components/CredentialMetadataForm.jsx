import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CredentialMetadataForm = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState({
    institutionName: '',
    degreeType: '',
    fieldOfStudy: '',
    graduationDate: '',
    gpa: '',
    verificationContact: '',
    contactEmail: '',
    additionalNotes: ''
  });

  const [errors, setErrors] = useState({});

  const institutionOptions = [
    { value: 'harvard', label: 'Harvard University' },
    { value: 'mit', label: 'Massachusetts Institute of Technology' },
    { value: 'stanford', label: 'Stanford University' },
    { value: 'berkeley', label: 'University of California, Berkeley' },
    { value: 'oxford', label: 'University of Oxford' },
    { value: 'cambridge', label: 'University of Cambridge' },
    { value: 'other', label: 'Other Institution' }
  ];

  const degreeTypeOptions = [
    { value: 'bachelor', label: 'Bachelor\'s Degree' },
    { value: 'master', label: 'Master\'s Degree' },
    { value: 'phd', label: 'Doctor of Philosophy (PhD)' },
    { value: 'associate', label: 'Associate Degree' },
    { value: 'certificate', label: 'Professional Certificate' },
    { value: 'diploma', label: 'Diploma' }
  ];

  const fieldOfStudyOptions = [
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'engineering', label: 'Engineering' },
    { value: 'business', label: 'Business Administration' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'law', label: 'Law' },
    { value: 'education', label: 'Education' },
    { value: 'arts', label: 'Liberal Arts' },
    { value: 'science', label: 'Natural Sciences' },
    { value: 'other', label: 'Other Field' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.institutionName) {
      newErrors.institutionName = 'Institution name is required';
    }
    if (!formData?.degreeType) {
      newErrors.degreeType = 'Degree type is required';
    }
    if (!formData?.fieldOfStudy) {
      newErrors.fieldOfStudy = 'Field of study is required';
    }
    if (!formData?.graduationDate) {
      newErrors.graduationDate = 'Graduation date is required';
    }
    if (!formData?.verificationContact) {
      newErrors.verificationContact = 'Verification contact is required';
    }
    if (!formData?.contactEmail) {
      newErrors.contactEmail = 'Contact email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.contactEmail)) {
      newErrors.contactEmail = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Credential Information</h3>
          <p className="text-sm text-muted-foreground">
            Provide details about your academic credential
          </p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Institution Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Institution Details
          </h4>
          
          <Select
            label="Institution Name"
            description="Select your educational institution"
            options={institutionOptions}
            value={formData?.institutionName}
            onChange={(value) => handleInputChange('institutionName', value)}
            error={errors?.institutionName}
            required
            searchable
            placeholder="Search for your institution..."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Degree Type"
              options={degreeTypeOptions}
              value={formData?.degreeType}
              onChange={(value) => handleInputChange('degreeType', value)}
              error={errors?.degreeType}
              required
              placeholder="Select degree type"
            />

            <Select
              label="Field of Study"
              options={fieldOfStudyOptions}
              value={formData?.fieldOfStudy}
              onChange={(value) => handleInputChange('fieldOfStudy', value)}
              error={errors?.fieldOfStudy}
              required
              searchable
              placeholder="Select field of study"
            />
          </div>
        </div>

        {/* Academic Details */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Academic Details
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Graduation Date"
              type="date"
              value={formData?.graduationDate}
              onChange={(e) => handleInputChange('graduationDate', e?.target?.value)}
              error={errors?.graduationDate}
              required
            />

            <Input
              label="GPA (Optional)"
              type="number"
              step="0.01"
              min="0"
              max="4"
              placeholder="e.g., 3.75"
              value={formData?.gpa}
              onChange={(e) => handleInputChange('gpa', e?.target?.value)}
              description="On a 4.0 scale"
            />
          </div>
        </div>

        {/* Verification Contact */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Verification Contact
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Contact Person"
              type="text"
              placeholder="e.g., Registrar Office, Dean Smith"
              value={formData?.verificationContact}
              onChange={(e) => handleInputChange('verificationContact', e?.target?.value)}
              error={errors?.verificationContact}
              required
              description="Person or office that can verify this credential"
            />

            <Input
              label="Contact Email"
              type="email"
              placeholder="registrar@university.edu"
              value={formData?.contactEmail}
              onChange={(e) => handleInputChange('contactEmail', e?.target?.value)}
              error={errors?.contactEmail}
              required
              description="Official institutional email"
            />
          </div>
        </div>

        {/* Additional Notes */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
            Additional Information
          </h4>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Additional Notes (Optional)
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={3}
              placeholder="Any additional information about this credential..."
              value={formData?.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e?.target?.value)}
            />
            <p className="text-xs text-muted-foreground">
              Include honors, specializations, or other relevant details
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium text-primary">Blockchain Security</p>
              <p className="text-xs text-primary/80">
                This information will be hashed and stored on the blockchain for permanent verification. 
                Ensure all details are accurate as they cannot be modified after submission.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            variant="default"
            loading={isSubmitting}
            iconName="Upload"
            iconPosition="left"
            className="min-w-[160px]"
          >
            {isSubmitting ? 'Processing...' : 'Continue to Blockchain'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CredentialMetadataForm;