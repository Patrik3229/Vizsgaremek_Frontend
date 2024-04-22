import { createContext, useState, ReactNode, useContext } from 'react';

/**
 * Interfész a keresési kontextushoz, amitartalmazza a keresési szöveget és a kiválasztott allergéneket.
 * @interface
 */
interface SearchContextType {
    searchText: string;
    setSearchText: (value: string) => void;
    selectedAllergens: number[];
    setSelectedAllergens: (value: number[]) => void;
    searchResults: any[];
    setSearchResults: (results: any[]) => void;
}

const SearchResultContext = createContext<SearchContextType | null>(null);

/**
 * Metódus a keresési kontextus eléréséhez.
 * @returns A keresési kontextust.
 */
export function useSearchResults() {
    const context = useContext(SearchResultContext);
    if (!context) {
        throw new Error('useSearchResults must be used within a SearchResultProvider');
    }
    return context;
}

/**
 * Kezeli a keresési szöveget, kiválasztott allergéneket és keresési eredményeket.
 * @param children - A komponens gyermek elemei, melyek hozzáférnek a kontextushoz.
 */
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