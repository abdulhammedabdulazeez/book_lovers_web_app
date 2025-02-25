import React, { useContext, useEffect } from 'react';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from './ui/sidebar';
import { FILTEROPTIONS } from '@/utils/filters_sorters';
import { Checkbox } from './ui/checkbox';
import { BookContext } from '@/store/books-context';
import { useSearchParams } from 'react-router-dom';



const Filters: React.FC = () => {
  const { selectedFilters, handleAddFilter, handleRemoveFilter } =
    useContext(BookContext);
  const [searchParams, setSearchParams] = useSearchParams();

  // Sync URL filters with context on component mount
  useEffect(() => {
    const urlFilters = searchParams.getAll("genre");
    // Update context if URL has filters
    if (
      urlFilters.length > 0 &&
      urlFilters.join(",") !== selectedFilters.join(",")
    ) {
      urlFilters.forEach((filter) => handleAddFilter(filter));
    }
  }, []);

  const handleFilterChange = (checked: boolean, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    
    if (checked) {
      handleAddFilter(value);
      // Add to URL
      newParams.append('genre', value);
    } else {
      handleRemoveFilter(value);
      // Remove from URL - we need to rebuild the genre parameters
      const currentGenres = searchParams.getAll('genre').filter(genre => genre !== value);
      newParams.delete('genre');
      currentGenres.forEach(genre => newParams.append('genre', genre));
    }
    
    // Reset to page 1 when filters change
    newParams.set('page', '1');
    setSearchParams(newParams);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Filters</SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="space-y-4 mt-4 ms-6">
          {FILTEROPTIONS.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={selectedFilters.includes(option.value)}
                onCheckedChange={(checked) =>
                  handleFilterChange(checked as boolean, option.value)
                }
              />
              <label
                htmlFor={option.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default Filters;