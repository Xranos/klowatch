import Poster from "./poster";
import { Link } from "react-router-dom";
import { useState } from "react";
import { removeFromWatchlist } from "../utils/watchlist";

function WatchListCard({ movie, onRemove }) {
    const [removing, setRemoving] = useState(false);

    const formatDate = (dateString) => {
        if (!dateString) return "Unknown Date";
        const date = new Date(dateString);
        const day = date.getDate();
        const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthName[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    const formatRating = (rating) => {
        return rating ? rating.toFixed(1) : "NA"
    }

    const handleRemove = () => {
        if (removing) return;
        setRemoving(true);
        const res = removeFromWatchlist(movie?.movie_id);
        if(!res.success) console.error(res.error);
        setRemoving(false);
        onRemove?.();

    }

    return (

        <div className=" w-full h-full rounded-2xl bg-[#313f47] p-4  flex items-strecth gap-5 shadow-lg ">
            <div className="w-40 sm:w-50">
                <Link to={`/movie/${movie?.movie_id}`}>
                    <Poster movie={movie} alt={movie?.title} className="w-24 h-28 shrink-0 rounded-lg" />
                </Link>
            </div>

            <div className="flex-1 min-w-0 flex flex-col">
                <div className=" text-white space-y-1 lg:space-y-2">
                    <Link to={`/movie/${movie?.movie_id}`}>
                        <h1 className="text-lg lg:text-xl font-semibold hover:text-[#6b6b6b] cursor-pointer ">{movie?.title || "Movie Title"}</h1>
                    </Link>
                    <p className="text-base lg:text-lg text-gray-400 ">{formatDate(movie?.release_date)}</p>
                    <p className="text-base lg:text-lg text-yellow-400">{formatRating(movie?.rating)} / 10.0⭐</p>
                </div>

                <div className="mt-auto flex gap-2 justify-end">
                    <button onClick={handleRemove} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white 
                rounded-2xl text-sm font-medium transition-colors shadow-lg active:shadow-inner ">  {removing ? "Removing..." : "Remove"}</button>
                </div>
            </div>
        </div>
    );
}

export default WatchListCard;