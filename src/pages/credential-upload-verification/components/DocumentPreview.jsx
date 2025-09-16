import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const DocumentPreview = ({ file, onRemove }) => {
  const [zoomLevel, setZoomLevel] = useState(100);
  const [rotation, setRotation] = useState(0);

  if (!file) return null;

  const isImage = file?.type?.startsWith('image/');
  const isPDF = file?.type === 'application/pdf';
  const fileSize = (file?.size / (1024 * 1024))?.toFixed(2);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleRotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const handleReset = () => {
    setZoomLevel(100);
    setRotation(0);
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Document Preview</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onRemove}
          iconName="X"
          className="text-muted-foreground hover:text-error"
        />
      </div>
      {/* File Info */}
      <div className="bg-muted rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon 
              name={isImage ? 'Image' : isPDF ? 'FileText' : 'File'} 
              size={20} 
              className="text-primary" 
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{file?.name}</p>
            <p className="text-xs text-muted-foreground">
              {fileSize} MB • {file?.type}
            </p>
          </div>
        </div>
      </div>
      {/* Preview Controls */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            iconName="ZoomOut"
            disabled={zoomLevel <= 50}
          />
          <span className="text-sm font-mono text-muted-foreground min-w-[60px] text-center">
            {zoomLevel}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            iconName="ZoomIn"
            disabled={zoomLevel >= 200}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          {isImage && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleRotate}
              iconName="RotateCw"
            />
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            iconName="RotateCcw"
          >
            Reset
          </Button>
        </div>
      </div>
      {/* Preview Area */}
      <div className="border border-border rounded-lg overflow-hidden bg-muted/30 min-h-[300px] flex items-center justify-center">
        {isImage ? (
          <div 
            className="transition-transform duration-200"
            style={{ 
              transform: `scale(${zoomLevel / 100}) rotate(${rotation}deg)`,
              maxWidth: '100%',
              maxHeight: '400px'
            }}
          >
            <Image
              src={URL.createObjectURL(file)}
              alt="Document preview"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        ) : isPDF ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-error/10 rounded-full flex items-center justify-center">
              <Icon name="FileText" size={32} className="text-error" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">PDF Preview Not Available</p>
              <p className="text-xs text-muted-foreground">
                PDF will be processed during blockchain upload
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="File" size={32} className="text-warning" />
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-foreground">Document Ready</p>
              <p className="text-xs text-muted-foreground">
                File will be processed during upload
              </p>
            </div>
          </div>
        )}
      </div>
      {/* Security Info */}
      <div className="mt-4 p-3 bg-success/5 border border-success/20 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm text-success font-medium">Security Verified</span>
        </div>
        <p className="text-xs text-success/80 mt-1">
          Document will be hashed and stored securely on IPFS with blockchain verification
        </p>
      </div>
    </div>
  );
};

export default DocumentPreview;