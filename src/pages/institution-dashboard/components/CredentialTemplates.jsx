import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CredentialTemplates = ({ templates, onCreateTemplate, onEditTemplate, onUseTemplate }) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    type: '',
    description: '',
    fields: []
  });

  const templateTypes = [
    { value: 'degree', label: 'Degree Certificate' },
    { value: 'diploma', label: 'Diploma' },
    { value: 'certificate', label: 'Certificate of Completion' },
    { value: 'transcript', label: 'Academic Transcript' },
    { value: 'award', label: 'Achievement Award' }
  ];

  const handleCreateTemplate = () => {
    onCreateTemplate(newTemplate);
    setNewTemplate({ name: '', type: '', description: '', fields: [] });
    setShowCreateForm(false);
  };

  const getTemplateIcon = (type) => {
    switch (type) {
      case 'degree': return 'GraduationCap';
      case 'diploma': return 'Award';
      case 'certificate': return 'FileCheck';
      case 'transcript': return 'FileText';
      case 'award': return 'Trophy';
      default: return 'File';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-sm">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-card-foreground">Credential Templates</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Create and manage templates for different credential types
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            iconName="Plus"
          >
            Create Template
          </Button>
        </div>
      </div>
      {showCreateForm && (
        <div className="p-6 border-b border-border bg-muted/30">
          <h4 className="text-md font-medium text-card-foreground mb-4">Create New Template</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Template Name"
              placeholder="e.g., Bachelor of Science"
              value={newTemplate?.name}
              onChange={(e) => setNewTemplate({ ...newTemplate, name: e?.target?.value })}
            />
            <Select
              label="Template Type"
              options={templateTypes}
              value={newTemplate?.type}
              onChange={(value) => setNewTemplate({ ...newTemplate, type: value })}
              placeholder="Select template type"
            />
            <div className="md:col-span-2">
              <Input
                label="Description"
                placeholder="Brief description of this credential template"
                value={newTemplate?.description}
                onChange={(e) => setNewTemplate({ ...newTemplate, description: e?.target?.value })}
              />
            </div>
          </div>
          <div className="flex items-center justify-end space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowCreateForm(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreateTemplate}
              disabled={!newTemplate?.name || !newTemplate?.type}
            >
              Create Template
            </Button>
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates?.map((template) => (
            <div key={template?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={getTemplateIcon(template?.type)} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-card-foreground">{template?.name}</h4>
                    <p className="text-xs text-muted-foreground">{template?.type}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  iconName="MoreHorizontal"
                />
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {template?.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>{template?.usageCount} times used</span>
                <span>Modified {new Date(template.lastModified)?.toLocaleDateString()}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUseTemplate(template?.id)}
                  iconName="FileCheck"
                  className="flex-1"
                >
                  Use Template
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEditTemplate(template?.id)}
                  iconName="Edit"
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>

        {templates?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-card-foreground mb-2">No Templates Created</h3>
            <p className="text-muted-foreground mb-4">
              Create your first credential template to streamline the issuance process.
            </p>
            <Button
              onClick={() => setShowCreateForm(true)}
              iconName="Plus"
            >
              Create First Template
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CredentialTemplates;