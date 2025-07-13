
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface CategoryTabsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  'All',
  'Gaming',
  'Music',
  'Art',
  'Technology',
  'Fitness',
  'Food',
  'Education',
  'Sports'
];

export const CategoryTabs = ({ selectedCategory, onCategoryChange }: CategoryTabsProps) => {
  return (
    <div className="overflow-x-auto scrollbar-none">
      <Tabs value={selectedCategory} onValueChange={onCategoryChange}>
        <TabsList className="inline-flex w-auto bg-transparent space-x-2 p-0">
          {categories.map((category) => (
            <TabsTrigger
              key={category}
              value={category}
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
                data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
                data-[state=inactive]:bg-muted data-[state=inactive]:text-muted-foreground
                hover:bg-muted-foreground/10 transition-colors"
            >
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
