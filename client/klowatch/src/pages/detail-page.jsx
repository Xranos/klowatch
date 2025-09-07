import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Poster from "../components/poster"
import WatchListBtn from "../components/watchListBtn"

function DetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`http://localhost:3000/api/movies/${id}`);
                if (!response.ok) throw new Error("Failed to fetch movie details");

                const data = await response.json();
                setMovie(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMovieDetails();
        }
    }, [id]);

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

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6 text-white">
                <div className="text-center text-xl">Loading movie details</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-6 text-white">
                <div className="text-center text-xl text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6 text-white">
            <div className="grid gap-6 md:grid-cols-[425px_1fr] sm:grid-cols-1 items-center">
                <div className="self-start">
                    <Poster movie={movie} variant="poster-detail" />
                </div>

                <div className="flex flex-col gap-4">
                    <h1 className="text-4xl font-bold">{movie?.title || "Unknown Title"}</h1>

                    <div className="flex items-center gap-10 text-xl">
                        <h2>{formatDate(movie?.release_date)}</h2>
                        <h2 className="text-yellow-400">{formatRating(movie?.vote_average)} ⭐</h2>
                    </div>

                    <div className="bg-[#313f47] p-5 rounded-2xl">
                        <p className="text-xl">
                            {movie?.overview || "No description available for this movie."}
                        </p>
                    </div>

                   {/* Credits Section */}
                    {(movie?.credits || movie?.directors || movie?.writers || movie?.cast) && (
                        <div className="bg-[#313f47] p-10 rounded-2xl divide-y divide-[#202a30]">
                            {/* Directors */}
                            {movie?.credits?.crew?.filter(p => p.job === "Director").length > 0 && (
                                <div className="pb-4">
                                    <h2 className="text-lg font-semibold">Directors</h2>
                                    <ul className="grid gap-2 sm:grid-cols-2">
                                        {movie.credits.crew
                                            .filter(p => p.job === "Director")
                                            .map((d, i) => (
                                                <li  key={`director-${d.id ?? i}`} className="px-2 list-disc">{d.name}</li>
                                            ))}
                                    </ul>
                                </div>
                            )}

                            {/* Writers */}
                            {movie?.credits?.crew?.filter(p => p.department === "Writing").length > 0 && (
                                <div className="py-4">
                                    <h2 className="text-lg font-semibold">Writers</h2>
                                    <ul className="grid gap-2 sm:grid-cols-2">
                                        {movie.credits.crew
                                            .filter(p => p.department === "Writing")
                                            .slice(0, 6)
                                            .map((w, i) => (
                                                <li key={`writer-${w.id ?? i}`} className="px-2 list-disc">{w.name}</li>
                                            ))}
                                    </ul>
                                </div>
                            )}

                            {/* Actors */}
                            {movie?.credits?.cast?.length > 0 && (
                                <div className="pt-4">
                                    <h2 className="text-lg font-semibold">Actors</h2>
                                    <ul className="grid gap-2 sm:grid-cols-2">
                                        {movie.credits.cast.slice(0, 8).map((a, i) => (
                                            <li key={`actor-${a.id ?? i}`} className="px-2 list-disc">{a.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}
                    <WatchListBtn variant="button-card" />
                </div>
            </div>
        </div>
    );

}

export default DetailPage