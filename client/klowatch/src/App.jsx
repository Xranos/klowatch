import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Navbar from "./components/navbar"
import HomePage from "./pages/home-page" 
import ProfilePage from "./pages/profile-page"  
import WatchListPage from "./pages/watchlist-page"  
import DetailPage from "./pages/detail-page"

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element = {<HomePage/>} />
        <Route path="/watchlist" element = {<WatchListPage/>} />
        <Route path="/profile" element = {<ProfilePage/>} />
        <Route path="/detail" element = {<DetailPage/>} />
      </Routes>
    </Router>
  )
}

export default App
