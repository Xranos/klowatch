import { useEffect, useState } from "react"
import Card from "../components/card"

function HomePage() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    const fetchPopularMovies = async () => {
        try{
            setLoading(true);
            const response = await fetch("/api/movies/popular");
            if(!response.ok) throw new Error("Failed to fetch movies");

            const data = await response.json();
            setMovies(data.results || []);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    if(loading){
        return(
            <div className="px-4 py-7 max-w-7xl mx-auto">
                <p className="text-white text-center">Loading Movies</p>
            </div>
        )
    }

    if(error){
        return(
            <div className="px-4 py-7 max-w-7xl mx-auto">
                <p className="text-red-500 text-center">Error: {error}</p>  
            </div>
        )
    }

    return (
        <div className="px-4 py-7 max-w-7xl mx-auto">
            <h1 className="text-4xl text-white font-bold mb-5">Popular Movies</h1>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {movies.map(movie => (
                    <Card key={movie.id} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default HomePage