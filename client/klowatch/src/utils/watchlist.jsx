const getDeviceId = () => {
    let deviceId = localStorage.getItem('device_id');
    if (!deviceId) {
        deviceId = 'device_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem('device_id', deviceId);
    }
    return deviceId;
}

const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:3000/api'
    : 'https://your-production-api.com/api';

export const addToWatchlist = async (movie) => {
    try {
        const deviceId = getDeviceId();

        const response = await fetch(`${API_BASE_URL}/watchlist`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify({ device_id: deviceId, movie: movie })
        });
        const data = await response.json();

        if (!response.ok) {
            if (data.error === "Movie already in watchlist") {
                return { success: false, error: "Already in Watchlist" };
            }
            throw new Error(data.error || 'Failed to add to watchlist');
        }
        return { success: true, message: "Added to watchlist successfully", data: data.data };

    } catch (error) {
        console.error('Error adding to watchlist: ', error);
        return { success: false, error: error.message || "Failed to add to watchlist" };
    }
};

export const removeFromWatchlist = async (movieId) => {
    try {
        const deviceId = getDeviceId();
        const response = await fetch(`${API_BASE_URL}/watchlist/${deviceId}/${movieId}`,
            { method: "DELETE" });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || "Failed to remove movie from watchlist")
        }
        return { success: true, message: "Successfully removed movie from watchlist" };
    } catch (error) {
        console.error("Error removing movie from watchlist: ", error);
        return { success: false, error: error.message || "Failed to remove movie from watchlist" };
    }
};

export const getWatchlist = async () => {
    try {
        const deviceId = getDeviceId();
        const response = await fetch(`${API_BASE_URL}/watchlist/${deviceId}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || "Failed to fetch from watchlist");
        }
        return { success: true, data: data };
    } catch (error) {
        console.error("Error fetching from watchlist: ", error);
        return { success: false, error: error.message || "Failed to fetch from watchlist", data: [] };
    }
};

export const isInWatchlist = async (movieId) => {
    try {
        const result = await getWatchlist();
        if (result.success) {
            return result.data.some(item => item.movies && item.movies.movie_id === movieId);
        }
        return false;
    } catch (error) {
        console.error("Error checking if movie is in watchlist: ", error);
        return false;
    }
};

export const getCurrentDeviceId = () => getDeviceId();
