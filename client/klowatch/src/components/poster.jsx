

const urlImage = "https://images-cdn.ubuy.co.id/63ef0a397f1d781bea0a2464-star-wars-rogue-one-movie-poster.jpg"

function Poster({variant = "default"}){
    const getVariant = () =>{
        switch(variant){
            case"poster-card":
                return "object-cover rounded-t-2xl w-full aspect-[2/3]";
            default:
                return "w-48 h-72";
        }
    };

    return (
        <img src={urlImage} className={`${getVariant()} cursor-pointer`}/>
    );
}

export default Poster;