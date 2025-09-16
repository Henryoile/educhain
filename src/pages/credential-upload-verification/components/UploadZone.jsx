import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFileSelect, uploadProgress, isUploading }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const acceptedFormats = ['.pdf', '.jpg', '.jpeg', '.png', '.doc', '.docx'];
  const maxFileSize = 10; // MB

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e?.dataTransfer?.files);
    handleFileSelection(files);
  };

  const handleFileInput = (e) => {
    const files = Array.from(e?.target?.files);
    handleFileSelection(files);
  };

  const handleFileSelection = (files) => {
    const validFiles = files?.filter(file => {
      const isValidFormat = acceptedFormats?.some(format => 
        file?.name?.toLowerCase()?.endsWith(format?.toLowerCase())
      );
      const isValidSize = file?.size <= maxFileSize * 1024 * 1024;
      return isValidFormat && isValidSize;
    });

    if (validFiles?.length > 0) {
      onFileSelect(validFiles?.[0]);
    }
  };

  const openFileDialog = () => {
    fileInputRef?.current?.click();
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Credential Document</h3>
        <p className="text-sm text-muted-foreground">
          Securely upload your academic credentials for blockchain verification
        </p>
      </div>
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          isDragOver
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
        } ${isUploading ? 'pointer-events-none opacity-60' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats?.join(',')}
          onChange={handleFileInput}
          className="hidden"
          disabled={isUploading}
        />

        {isUploading ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Uploading to IPFS...</p>
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground">{uploadProgress}% complete</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Icon name="Upload" size={32} className="text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">
                Drag and drop your document here
              </p>
              <p className="text-xs text-muted-foreground">or</p>
              <Button
                variant="outline"
                onClick={openFileDialog}
                iconName="FolderOpen"
                iconPosition="left"
              >
                Browse Files
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Accepted formats:</span>
          <span className="font-mono text-foreground">{acceptedFormats?.join(', ')}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Maximum file size:</span>
          <span className="font-mono text-foreground">{maxFileSize} MB</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-success">
          <Icon name="Shield" size={16} />
          <span>Files are encrypted and stored on IPFS for tamper-proof security</span>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;