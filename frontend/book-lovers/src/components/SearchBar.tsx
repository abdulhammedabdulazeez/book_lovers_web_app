import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from './ui/input';
import { Search as SearchIcon, X } from "lucide-react";
import { Button } from './ui/button';

const SearchBar: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    // Initialize search term from URL to maintain state
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
    
    // Handle search submission
    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault();
        
        const newParams = new URLSearchParams(searchParams);
        if (searchTerm.trim()) {
            newParams.set('search', searchTerm.trim());
        } else {
            newParams.delete('search');
        }
        // Always reset to page 1 when searching
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    // Handle enter key press
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleClearSearch = () => {
        setSearchTerm('');
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('search');
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    return (
        <form onSubmit={handleSearch} className="flex items-center gap-2 w-full max-w-md">
            <div className="relative flex-1">
                <SearchIcon 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    size={20} 
                />
                <Input
                    type="text"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pl-10 pr-8 py-2 w-full"
                />
                {searchTerm && (
                    <button
                        type="button"
                        onClick={handleClearSearch}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X size={20} />
                    </button>
                )}
            </div>
            <Button type="submit" className="whitespace-nowrap">
                Search
            </Button>
        </form>
    );
};

export default SearchBar;