import { Link } from "react-router-dom";
import Poster from "./poster";
import WatchListBtn from "./watchListBtn";

// const urlImage = "https://images-cdn.ubuy.co.id/63ef0a397f1d781bea0a2464-star-wars-rogue-one-movie-poster.jpg"

function Card(){
    return (
        <div className="bg-[#313f47] rounded-2xl">
            <Link to="detail">
                <Poster variant="poster-card" />
            </Link>
            <div className="mt-2 px-2">
                <p className="text-sm text-yellow-400">7.8 ⭐</p>
                <Link to="detail">
                    <h2 className="font-semibold text-white hover:text-[#6b6b6b] cursor-pointer pt-1">Rogue One: A Star Wars Story</h2>
                </Link>
                <p className="text-white text-xs pt-1">14-12-2026</p>
                <div className="items-center flex flex-col py-2">
                    <WatchListBtn variant="button-card"/>
                </div>
            </div>
        </div>        
    )
}

export default Card;