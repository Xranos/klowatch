import Poster from "./poster";

// const urlImage = "https://images-cdn.ubuy.co.id/63ef0a397f1d781bea0a2464-star-wars-rogue-one-movie-poster.jpg"

function Card(){
    return (
        <div className="bg-[#313f47] rounded-2xl">
            <Poster variant="poster-card" />
            <div className="mt-2 px-2">
                <p className="text-sm text-yellow-400">7.8 ⭐</p>
                <h2 className="font-semibold text-white hover:text-[#6b6b6b] cursor-pointer pt-1">Rogue One: A Star Wars Story</h2>
                <p className="text-white text-xs pt-1">14-12-2026</p>
                <div className="items-center flex flex-col py-2">
                    <button className="bg-[#68767e] py-2 px-4 rounded-2xl text-white hover:bg-[#6b6b6b] cursor-pointer">Add To Watchlist</button>
                </div>
            </div>
        </div>        
    )
}

export default Card;