import placeholder from "../assets/No-Image-Placeholder.svg.png";


function Poster({ movie, variant = "default" }) {
    const getVariant = () => {
        switch (variant) {
            case "poster-card":
                return "object-cover rounded-t-2xl w-full aspect-[2/3] cursor-pointer shadow-inner";
            case "poster-detail":
                return "object-cover rounded-2xl w-full shadow-lg";
            default:
                return "w-48 h-72 rounded-2xl w-full cursor-pointer shadow-lg";
        }
    };

    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";


     const posterSrc = movie?.poster_url 
        ? movie.poster_url  
        : movie?.poster_path 
        ? `${imageBaseUrl}${movie.poster_path}` 
        : placeholder;


    return (
        <img src={posterSrc} alt={movie?.title || "Movie Poster"} className={`${getVariant()}`} />
    );
}

export default Poster;