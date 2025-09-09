import Poster from "./poster";

function WatchListCard({ movie }) {
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

    const handleMarkFinished = () => {
        console.log("Marked as finished:", movie?.title);
        // Add your logic here
    }

    const handleRemove = () => {
        console.log("Removing from watchlist:", movie?.title);
        // Add your logic here
    }

    return (
        
        <div className="rounded-2xl bg-[#313f47] p-4 mx-auto flex items-strecth gap-5 max-w-3xl ">
            <div className="flex-shrink-0">
                <Poster src={movie?.poster} alt={movie?.title} className="w-20 h-28 rounded-lg" />
            </div>
            
            <div className="flex-grow flex flex-col min-h-28">
                <div className=" text-white space-y-1">
                    <h1 className="text-2xl font-semibold ">{movie?.title || "Movie Title"}</h1>
                    <p className="text-xl text-white">{formatDate(movie?.releaseDate)}</p>
                    <p className="text-xl text-yellow-400">{formatRating(movie?.vote_average)}⭐</p>
                </div>

                <div className="mt-auto flex gap-2 justify-end">
                    <button onClick={handleMarkFinished} className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white 
                rounded-2xl text-sm font-medium transition-colors duration-200">Finished</button>

                    <button onClick={handleRemove} className="px-4 py-2 bg-red-500 hover:bg-red-700 text-white 
                rounded-2xl text-sm font-medium transition-colors duration-200">Remove</button>
                </div>
            </div>
        </div>
    );
}

export default WatchListCard;