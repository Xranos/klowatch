import { Link } from "react-router-dom";
import Poster from "./poster";
import WatchListBtn from "./watchListBtn";


function Card({ movie }) {
    const formatDate = (dateString) => {
        if (!dateString) return "Unknown Date";
        const date = new Date(dateString);
        const day = date.getDate();
        const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthName[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    };
    const formatRating = (rating) => {
        return rating ? rating.toFixed(1) : "NA"
    }
    return (
        <div className="bg-[#313f47] rounded-2xl grid grid-rows-[auto_1fr] h-full shadow-lg">
            <Link to={`/movie/${movie?.id}`}>
                <Poster movie={movie} variant="poster-card" />
            </Link>
            <div className="mt-2 px-2 grid grid-rows-[auto_auto_auto_1fr] pb-2">
                <p className="text-sm text-yellow-400">{formatRating(movie?.vote_average)}⭐</p>
                <Link to={`/movie/${movie?.id}`}>
                    <h2 className="font-semibold text-white hover:text-[#6b6b6b] transition-durations-300 cursor-pointer pt-1">{movie?.title || "Unknown Title"}</h2>
                </Link>
                <p className="text-white text-xs pt-1">{formatDate(movie?.release_date)}</p>
                <div className="items-center flex flex-col justify-end py-2">
                    <WatchListBtn variant="button-card" movie={movie} />
                </div>
            </div>
        </div>
    )
}

export default Card;