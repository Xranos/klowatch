import { useState } from 'react';
import { addToWatchlist } from '../utils/watchlist';

function WatchListBtn({ variant = "default", movie, onSuccess }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isAdded, setIsAdded] = useState(false);

    const handleAddWatchlist = async () => {
        if (!movie) {
            console.error("No Movie Data");
            return;
        }

        setIsLoading(true);

        const result = await addToWatchlist(movie);
        if (result.success) {
            setIsAdded(true);
            if (onSuccess) {
                onSuccess();
            }
            setTimeout(() => setIsAdded(false), 2000);
        } else {
            if (result.error === "Already in Watchlist") {
                setIsAdded(true);
                setTimeout(() => setIsAdded(false), 2000);
            } else {
                alert("Failed to add to watchlist " + result.error);
            }
        }
        setIsLoading(false);
    };

    const getVariant = () => {
        switch (variant) {
            case "button-card":
                return "bg-[#68767e] py-2 px-4 rounded-2xl text-white hover:bg-[#6b6b6b] cursor-pointer"
            default:
                return ""
        }
    }

    const getButtonStyle = () => {
        // if (isAdded) return "bg-green-600 hover:bg-green-700 py-2 px-4 rounded-2xl text-white cursor-pointer";
        // if (isLoading) return "bg-gray-600 py-2 px-4 rounded-2xl text-white cursor-not-allowed";
        return getVariant();
    };

    const getButtonText = () => {
        // if (isLoading) return "Adding...";
        // if (isAdded) return "Added ✓";
        return "Add To Watchlist";
    }

    return (
        <button onClick={handleAddWatchlist} disabled={isLoading} className={`${getButtonStyle()} font-medium active:shadow-inner shadow-lg`}>{getButtonText()}</button>
    );
}

export default WatchListBtn