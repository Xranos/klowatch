import { FiSearch } from "react-icons/fi";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";



function Searchbar({ onSearchResults, onClearSearch }) {
    const [activeSearch, setActiveSearch] = useState([]);
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate()


    useEffect(() => {
        if (query.trim() === "") {
            setActiveSearch([]);
            return;
        }
        const timeoutId = setTimeout(() => {
            handleSearch(query);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setActiveSearch([]);
            }
        };
        if (activeSearch.length > 0) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeSearch.length]);

    const handleSearch = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setActiveSearch([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch(
                `http://localhost:3000/api/search?q=${encodeURIComponent(searchQuery)}`
            );
            if (!response.ok) {
                throw new Error("Search Error");
            }
            const data = await response.json();
            setActiveSearch(data.results?.slice(0, 5) || []);
        } catch (error) {
            console.error('Search error:', error);
            setActiveSearch([]);
        } finally {
            setIsLoading(false);
        }
    }

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    }

    const handleMovieSelect = (movie) => {
        console.log("Selected movie:", movie);
        setQuery(movie.title);
        setActiveSearch([]);
        navigate({ pathname: "/home", search: `?search=${encodeURIComponent(q)}` });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const q = query.trim();
        if (!q) return;
        setActiveSearch([]);
        navigate({ pathname: "/home", search: `?search=${encodeURIComponent(q)}` });
    }

    const performFullSearch = async (searchQuery) => {
        if (!searchQuery.trim()) return;
        try {
            const response = await fetch(
                `http://localhost:3000/api/search?q=${encodeURIComponent(searchQuery)}`
            );
            if (!response.ok) {
                throw new Error("Search Error");
            }
            const data = await response.json();
            const allResults = data.results || [];

            if (onSearchResults) {
                onSearchResults(allResults, searchQuery);
            }
        } catch (error) {
            console.error('Full search error:', error);
        }
    }

    return (
        <form className="w-full sm:w-[600px] relative" onSubmit={handleSubmit} ref={searchRef}>
            <div className="relative">
                <input type="search" placeholder="Type Here" value={query} className="w-full p-2 rounded-2xl bg-white placeholder-[#313f47] text-[#313f47] 
            focus:outline-none focus:ring-2 focus:ring-[#6b6b6b] shadow-lg" onChange={handleInputChange} />
                <button type="submit" className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-[#313f47] rounded-2xl cursor-pointer">
                    <FiSearch />
                </button>
            </div>

            {
                activeSearch.length > 0 && (
                    <div className="absolute top-15 p-2 bg-white text-[#313f47] w-full rounded-2xl left-1/2 -translate-x-1/2 flex flex-col gap-2" >
                        <div className="flex flex-col">
                            {activeSearch.map((movie) => (
                                <div key={movie.id} className="p-2 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors" onClick={() => handleMovieSelect(movie)}>
                                    <div className="font-semibold">{movie.title}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }
        </form>
    );
}

export default Searchbar