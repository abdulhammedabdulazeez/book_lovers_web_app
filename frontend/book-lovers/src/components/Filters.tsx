import React, { useContext } from 'react';
import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel } from './ui/sidebar';
import { FILTEROPTIONS } from '@/utils/filters_sorters';
import { Checkbox } from './ui/checkbox';
import { BookContext } from '@/store/books-context';



const Filters: React.FC = () => {
  const { selectedFilters, handleAddFilter, handleRemoveFilter } =
    useContext(BookContext);
    // const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

    const handleFilterChange = (checked: boolean, value: string) => {
      if (checked) {
        handleAddFilter(value);
        console.log(selectedFilters)
      } else {
        handleRemoveFilter(value);
        console.log(selectedFilters);
      }
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