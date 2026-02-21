import './SearchBar.css';

export default function SearchBar({
    searchText: searchText,
    setSearchText: setSearchText,
    sortBy: sortBy,
}: {
    searchText: string;
    setSearchText: (searchText: string) => void;
    sortBy: (sortBy: string) => void;
}) {
    return (
        <div className="search-bar-container">
            <input
                className="search-bar"
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="sort-button" onClick={() => sortBy('asc')}>
                Sort
            </button>
        </div>
    );
}
