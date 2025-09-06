import Poster from "../components/poster"
import WatchListBtn from "../components/watchListBtn"

function DetailPage() {
    return (
        <div className="max-w-6xl mx-auto p-6 text-white">
            <div className="grid gap-6 md:grid-cols-[425px_1fr] sm:grid-cols-1  items-center">
                <div className="self-start md:sticky md:top-6">
                    <Poster variant="poster-detail" />
                </div>
                <div className="flex flex-col gap-4">
                    <h1 className=" text-4xl font-bold">Rogue One: A Star Wars Story</h1>
                    <div className="flex items-center gap-10 text-xl">
                        <h2>Release Date: 14-12-2026</h2>
                        <h2 className=" text-yellow-400">7.8 ⭐</h2>
                    </div>
                    <div className="bg-[#313f47] p-5 rounded-2xl">
                        <p className="text-xl">
                            Former scientist Galen Erso lives on a farm with his wife and young daughter, 
                            Jyn. His peaceful existence comes crashing down when the evil Orson Krennic takes him away from his beloved family. 
                            Many years later, Galen becomes the Empire's lead engineer for the most powerful weapon in the galaxy, the Death Star. K
                            nowing that her father holds the key to its destruction, Jyn joins forces with a spy and other resistance fighters to steal the space station's plans for the Rebel Alliance.
                        </p>
                    </div>
                    <div className="bg-[#313f47] p-10 rounded-2xl divide-y divide-[#202a30]">
                        <div className="pb-4">
                            <h2 className="text-lg font-semibold">Directors</h2>
                            <ul className="grid gap-2 sm:grid-cols-2">
                                <li className="px-2 list-disc">Gareth Edwards</li>
                            </ul>
                        </div>

                        <div className="py-4">
                            <h2 className="text-lg font-semibold">Writers</h2>
                            <ul className="grid gap-2 sm:grid-cols-2">
                                <li className="px-2 list-disc">Tony Gilroy</li>
                                <li className="px-2 list-disc">Chris Weitz</li>
                                <li className="px-2 list-disc">John Knoll</li>
                            </ul>
                        </div>

                        <div className="pt-4">
                            <h2 className="text-lg font-semibold">Actors</h2>
                            <ul className="grid gap-2 sm:grid-cols-2">
                                <li className="px-2 list-disc">Felicity Jones</li>
                                <li className="px-2 list-disc">Diego Luna</li>
                                <li className="px-2 list-disc">Alan tudyk</li>
                            </ul>
                        </div>

                    </div>
                    <WatchListBtn variant="button-card"/>
                </div>
            </div>
        </div>
    )
}

export default DetailPage