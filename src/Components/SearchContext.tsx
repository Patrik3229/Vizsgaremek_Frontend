// SearchContext.tsx
import { createContext, useState, ReactNode, useContext } from 'react';

interface SearchContextType {
    searchText: string;
    setSearchText: (value: string) => void;
    selectedAllergens: number[];
    setSelectedAllergens: (value: number[]) => void;
    searchResults: any[];
    setSearchResults: (results: any[]) => void;
}

const SearchResultContext = createContext<SearchContextType | null>(null);  // Allow for null to handle the error state

export function useSearchResults() {
    const context = useContext(SearchResultContext);
    if (!context) {
        throw new Error('useSearchResults must be used within a SearchResultProvider');
    }
    return context;
}

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [selectedAllergens, setSelectedAllergens] = useState<number[]>([]);
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const value = {
        searchText,
        setSearchText,
        selectedAllergens,
        setSelectedAllergens,
        searchResults,
        setSearchResults,
    };

    return (
        <SearchResultContext.Provider value={value}>
            {children}
        </SearchResultContext.Provider>
    );
};