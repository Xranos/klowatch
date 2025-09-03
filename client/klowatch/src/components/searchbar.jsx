'use client'

import { FiSearch } from "react-icons/fi";
import { movies } from "./dataTest";
import { useState } from "react";

function Searchbar() {

    const [activeSearch, setActiveSearch] = useState([])

    const handleSearch = (e) => {
        if (e.target.value == "") {
            return false
        }
        setActiveSearch(movies.filter(m => m.includes(e.target.value)).slice(0, 8))
    }

    return (
        <form className="w-full sm:w-[600px] relative">
            <div className="relative">
                <input type="search" placeholder="Type Here" className="w-full p-2 rounded-2xl bg-white placeholder-[#313f47] text-[#313f47]" onChange={(e) => handleSearch(e)} />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-[#313f47] rounded-2xl">
                    <FiSearch />
                </button>
            </div>

            {
                activeSearch.length > 0 && (
                    <div className="absolute top-15 p-2 bg-white text-[#313f47] w-full rounded-2xl left-1/2 -translate-x-1/2 flex flex-col gap-2">
                        {
                            activeSearch.map(s => (
                                <span>{s}</span>
                            ))
                        }
                    </div>
                )
            }
        </form>
    )
}

export default Searchbar