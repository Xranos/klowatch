import WatchListCards from "../components/watchListCard"
import { useState, useEffect } from 'react';
import { getWatchlist } from "../utils/watchlist";

function WatchListPage() {
    const [watchlistData, setWatchlistData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchWatchlist();
    }, []);

    const fetchWatchlist = async () => {
        setIsLoading(true);
        const result = await getWatchlist();

        if (result.success) {
            setWatchlistData(result.data);
            setError(null);
        } else {
            setError(result.error);
        }
        setIsLoading(false);
    };

    if (isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-5xl font-bold mb-7 text-center text-white">My Watchlist</h1>
                <div className="text-center text-white text-xl">Loading your watchlist...</div>
            </div>
        );
    }

     if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-5xl font-bold mb-7 text-center text-white">My Watchlist</h1>
                <div className="text-center text-red-500 text-xl">Error: {error}</div>
            </div>
        );
    }

    if (watchlistData.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-5xl font-bold mb-7 text-center text-white">My Watchlist</h1>
                <div className="text-center text-gray-400 text-xl">
                    Your watchlist is empty. Start adding some movies!
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-5xl font-bold mb-7 text-center text-white">My Watchlist</h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-10xl mx-auto">
               {watchlistData.map((item) => (
                    <WatchListCards 
                        key={item.id} 
                        movie={item.movies} 
                        watchlistId={item.id}
                        onRemove={fetchWatchlist} 
                    />
                ))}
            </div>
        </div>
    )
}

export default WatchListPage