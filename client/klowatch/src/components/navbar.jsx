import { useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./searchbar";

import { RiMovie2Fill } from "react-icons/ri";
import { CiMenuBurger } from "react-icons/ci";
// import { CgProfile } from "react-icons/cg";
import { CiViewList } from "react-icons/ci";

function Navbar({onSearchResults, onClearSearch}) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <nav className="bg-[#313f47] text-white shadow-xl">
      <div className=" h-16 items-center flex justify-between">

        {/* Logo Desktop Ver */}
        <h1 className="hidden sm:flex text-4xl font-bold pl-10">
          <Link to="/" className="flex items-center">
            Kl<RiMovie2Fill size={30} className="text-[#202a30]" />watch
          </Link>
        </h1>

        {/* Logo Mobile Ver */}
        <h1 className="flex sm:hidden text-2xl font-bold px-4">
          <Link to="/" className="flex items-center">
            Kl<RiMovie2Fill size={22} className="text-[#202a30]" />watch
          </Link>
        </h1>


        <div className="hidden sm:block">
          <Searchbar onSearchResults={onSearchResults} onClearSearch={onClearSearch}/>
        </div>

        {/* Menus Desktop Ver */}
        <div className="hidden sm:block">
          <ul className="flex gap-20 text-2xl font-medium pr-15 ">
            <Link to="watchlist"><li className="hover:text-[#6b6b6b] flex gap-2 items-center" ><CiViewList size={28} />Watchlist</li></Link>
            {/* <Link to="profile"><li className="hover:text-[#6b6b6b] flex gap-2 items-center"><CgProfile size={24} />Profile</li></Link> */}
          </ul>
        </div>

        {/* Burger for Mobile */}
        <button onClick={() => setIsOpen(!isOpen)}
          className="block sm:hidden px-4 text-3xl text-white">
          <CiMenuBurger />
        </button>
      </div>

      {/* Mobile searchbar*/}
      <div className="sm:hidden px-10 pb-2">
        <Searchbar onSearchResults={onSearchResults} onClearSearch={onClearSearch}/>
      </div>

      {/* Menus Mobile Ver */}
      <div className={`${isOpen ? "block" : "hidden"}
        sm:hidden bg-[#465a66]`}>
        <ul className="divide-y divide-[#202a30]">
          <li className="hover:text-[#6b6b6b] text-xl font-medium px-4 py-1" ><Link to="watchlist" className="flex gap-2 items-center"><CiViewList size={30} />Watchlist</Link></li>
          {/* <li className="hover:text-[#6b6b6b] text-xl font-medium px-4 py-1"><Link to="profile" className="flex gap-2 items-center"><CgProfile size={30} />Profile</Link></li> */}
        </ul>
      </div>

    </nav>

  )
}

export default Navbar
