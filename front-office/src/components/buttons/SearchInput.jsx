
const SearchInput = ({ setSearchItem }) => {
    let debutTimout;

    const handleChange = (e) => {
        const searchValue = e.target.value;
        
        clearTimeout(debutTimout);

        debutTimout = setTimeout(() => {
            setSearchItem(searchValue);
        }, 500);
    }

    return (
        <div className="relative">
            <span className="absolute left-2 top-2.5 text-amber-700">🔍</span>
            <input
                type="text"
                className="w-full pl-8 py-2 border border-amber-600 rounded focus:outline-none focus:border-amber-800"
                placeholder="Search categories..."
                // value={searchItem}
                onChange={(e) => handleChange(e)}
            />
        </div>
    )
}

export default SearchInput;