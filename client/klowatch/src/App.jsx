import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Navbar from "./components/navbar"
import HomePage from "./pages/home-page"
// import ProfilePage from "./pages/profile-page"  
import WatchListPage from "./pages/watchlist-page"
import DetailPage from "./pages/detail-page"

function App() {
  const [searchResults, setSearchResults] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearchResults = (results, query) => {
    setSearchResults(results);
    setSearchQuery(query);
    setIsSearchActive(true);
  };

  const handleClearSearch = () => {
    setSearchResults(null);
    setSearchQuery("");
    setIsSearchActive(false);
  };

  return (
    <Router>
      <Navbar onSearchResults={handleSearchResults} onClearSearch={handleClearSearch} />

      <Routes>
        <Route path="/" element={<HomePage searchResults={searchResults} searchQuery={searchQuery} isSearchActive={isSearchActive} onClearSearch={handleClearSearch} />} />
        <Route path="/watchlist" element={<WatchListPage />} />
        <Route path="/movie/:id" element={<DetailPage />} />
        <Route path="*" element={<HomePage searchResults={searchResults} searchQuery={searchQuery} isSearchActive={isSearchActive} onClearSearch={handleClearSearch} />} />
      </Routes>
    </Router>
  )
}

export default App
