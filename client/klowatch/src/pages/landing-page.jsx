import { Link } from "react-router-dom";
import { RiMovie2Fill } from "react-icons/ri";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-15 px-4 text-center ">
      <h1 className="flex items-center text-white font-bold text-6xl sm:text-7xl lg:text-8xl -mt-16">
        Kl <RiMovie2Fill className="inline-block  text-white" /> watch
      </h1>
      <p className="max-w-2xl text-white text-lg sm:text-xl">
        Discover movies and build your personal watchlist with persistent browser storage. 
        My first full-stack web app built with React, Express.js, and real-time movie data from TMDB.
      </p>
      <Link to="/home" className="px-6 py-3 rounded-2xl bg-white text-gray-900 text-lg font-semibold shadow-lg active:shadow-inner hover:bg-gray-400 transition-durations-300">
        Get Started
      </Link>
    </div>
  );
}
