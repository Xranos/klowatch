import { useEffect, useState } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { IoArrowBackCircle } from "react-icons/io5";
import Card from "../components/card";

function HomePage({ searchResults, searchQuery, isSearchActive, onClearSearch }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [localSearchActive, setLocalSearchActive] = useState(false);
    const [localSearchQuery, setLocalSearchQuery] = useState("");


    useEffect(() => {
        const urlSearchQuery = searchParams.get('search');
        const navigationSearchResults = location.state?.searchResults;
        const navigationSearchQuery = location.state?.searchQuery;

        if (navigationSearchResults && navigationSearchQuery) {
            setMovies(navigationSearchResults);
            setLocalSearchQuery(navigationSearchQuery);
            setLocalSearchActive(true);
            setLoading(false);
            setError(null);
        } else if (urlSearchQuery) {
            setLocalSearchQuery(urlSearchQuery);
            setLocalSearchActive(true);
            performUrlSearch(urlSearchQuery);
        } else if (!isSearchActive) {
            setLocalSearchActive(false);
            setLocalSearchQuery("");
            fetchPopularMovies();
        }
    }, [location, searchParams, isSearchActive, searchResults, searchQuery]);

    useEffect(() => {
        const hasQuery = !!searchParams.get("search");
        if (hasQuery || localSearchActive) return;
        fetchPopularMovies();
    }, [searchParams, localSearchActive]);

    useEffect(() => {
        if (isSearchActive && searchResults) {
            setMovies(searchResults);
            setLoading(false);
            setError(null);
        }
    }, [searchResults, isSearchActive]);

    const performUrlSearch = async (query) => {
        try {
            setLoading(true);
            const response = await fetch(
                `http://localhost:3000/api/search?q=${encodeURIComponent(query)}`
            );
            if (!response.ok) {
                throw new Error("Search Error");
            }
            const data = await response.json();
            setMovies(data.results || []);
            setLocalSearchActive(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchPopularMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:3000/api/movies/popular");
            if (!response.ok) throw new Error("Failed to fetch movies");

            const data = await response.json();
            setMovies(data.results || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const handleClearSearch = () => {
        if (window.history.length > 1) {
            navigate(-1);
        } else {
            navigate("/home", { replace: true });
        }
        setSearchParams({});
        if (onClearSearch) onClearSearch();
        setLocalSearchActive(false);
        setLocalSearchQuery("");
    };




    if (loading) {
        return (
            <div className="px-4 py-7 max-w-7xl mx-auto">
                <p className="text-white text-center">Loading Movies</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="px-4 py-7 max-w-7xl mx-auto">
                <p className="text-red-500 text-center">Error: {error}</p>
            </div>
        )
    }

    const displaySearchActive = isSearchActive || localSearchActive;
    const displaySearchQuery = searchQuery || localSearchQuery;


    return (
        <div className="px-4 py-7 max-w-7xl mx-auto">
            <div className="flex items-center gap-x-5 mb-5">
                {displaySearchActive && (
                    <button onClick={handleClearSearch} className="text-white hover:text-[#6b6b6b]  lg:text-lg sm:text-base"><IoArrowBackCircle size={45} /></button>
                )}
                <h1 className="lg:text-4xl sm:text-2xl text-white font-bold">
                    {displaySearchActive ? `Search Results for "${displaySearchQuery}"` : "Popular Movies"}
                </h1>
            </div>
            {movies.length === 0 ? (
                <p className="text-white text-center text-xl">
                    {displaySearchActive ? "No movies found for your search." : "No movies available."}
                </p>
            ) : (
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                    {movies.map(movie => (
                        <Card key={movie.id} movie={movie} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default HomePage