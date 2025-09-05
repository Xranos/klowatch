
function WatchListBtn({variant = "default"}) {

    const getVariant = () => {
        switch (variant) {
            case "button-card":
                return "bg-[#68767e] py-2 px-4 rounded-2xl text-white hover:bg-[#6b6b6b] cursor-pointer"
            default:
                return ""
        }
    }
    return (
        <button className={`${getVariant()}`}>Add To Watchlist</button>
    )
};

export default WatchListBtn