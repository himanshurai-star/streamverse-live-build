
import React, { useState } from 'react';
import { Upload, FileCheck, AlertCircle } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';

interface DocumentUploadProps {
  formData: any;
  setFormData: (data: any) => void;
}

const DocumentUpload = ({ formData, setFormData }: DocumentUploadProps) => {
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        documents: { ...prev.documents, idDocument: file }
      }));
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    const file = event.dataTransfer.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        documents: { ...prev.documents, idDocument: file }
      }));
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Government ID Upload</CardTitle>
          <CardDescription>Upload a clear photo of your government-issued ID</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Accepted Documents</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
              <div className="p-2 bg-muted rounded text-center">Aadhaar Card</div>
              <div className="p-2 bg-muted rounded text-center">Passport</div>
              <div className="p-2 bg-muted rounded text-center">Driver's License</div>
              <div className="p-2 bg-muted rounded text-center">National ID</div>
            </div>
          </div>

          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {formData.documents.idDocument ? (
              <div className="space-y-2">
                <FileCheck className="w-12 h-12 text-green-500 mx-auto" />
                <p className="font-medium">Document Uploaded</p>
                <p className="text-sm text-muted-foreground">{formData.documents.idDocument.name}</p>
                <Button variant="outline" size="sm">
                  Replace Document
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Upload className="w-12 h-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="font-medium">Drag and drop your ID here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                </div>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="id-upload"
                />
                <Button variant="outline" onClick={() => document.getElementById('id-upload')?.click()}>
                  Choose File
                </Button>
              </div>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="space-y-2">
                <p className="font-medium text-blue-800 dark:text-blue-200">Photo Guidelines</p>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Ensure all text is clearly readable</li>
                  <li>• No glare or shadows on the document</li>
                  <li>• Show the entire document in frame</li>
                  <li>• Use good lighting for best quality</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUpload;
