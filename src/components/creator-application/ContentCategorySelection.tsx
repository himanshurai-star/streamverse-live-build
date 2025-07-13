
import React from 'react';
import { Gamepad2, Music, MessageSquare, Plane, Sparkles, Utensils } from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface ContentCategorySelectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

const ContentCategorySelection = ({ formData, setFormData }: ContentCategorySelectionProps) => {
  const categories = [
    { id: 'gaming', name: 'Gaming', icon: Gamepad2 },
    { id: 'music', name: 'Music', icon: Music },
    { id: 'talk', name: 'Talk Show', icon: MessageSquare },
    { id: 'travel', name: 'Travel', icon: Plane },
    { id: 'entertainment', name: 'Entertainment', icon: Sparkles },
    { id: 'food', name: 'Food & Cooking', icon: Utensils },
  ];

  const handleCategoryToggle = (categoryId: string) => {
    const currentCategories = formData.content.categories || [];
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    
    setFormData(prev => ({
      ...prev,
      content: { ...prev.content, categories: newCategories }
    }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Categories</CardTitle>
          <CardDescription>Select the types of content you plan to create</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = formData.content.categories?.includes(category.id);
              
              return (
                <div
                  key={category.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => handleCategoryToggle(category.id)}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Icon className={`w-8 h-8 ${isSelected ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="font-medium">{category.name}</span>
                    <Checkbox checked={isSelected} readOnly />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Description</CardTitle>
          <CardDescription>Describe the type of content you plan to create</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="contentDescription">Tell us about your content *</Label>
            <Textarea
              id="contentDescription"
              value={formData.content.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                content: { ...prev.content, description: e.target.value }
              }))}
              placeholder="Describe your content style, topics you'll cover, and what makes your content unique..."
              rows={4}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground">
              {formData.content.description?.length || 0}/500 characters
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Content Guidelines:</strong> All content must comply with our community guidelines. 
              We review creator content to ensure it's appropriate for our platform.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentCategorySelection;
