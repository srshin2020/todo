import './SearchBar.css';

export default function SearchBar({
    onSearch,
    searchTerm,
    setSearchTerm,
}: {
    onSearch: (searchTerm: string) => void;
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}) {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        onSearch(newSearchTerm);
    };

    return (
        <input
            className="search-bar"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
        />
    );
}
