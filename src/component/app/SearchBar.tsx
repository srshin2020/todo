import './SearchBar.css';

export default function SearchBar({
    searchTerm,
    setSearchTerm,
}: {
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}) {
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
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
