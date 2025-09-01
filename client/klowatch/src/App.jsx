import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import HomePage from "./pages/home-page" 
import ProfilePage from "./pages/profile-page"  
import WatchListPage from "./pages/watchlist-page"  

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element = {<HomePage/>} />
        <Route path="/watchlist" element = {<WatchListPage/>} />
        <Route path="/profile" element = {<ProfilePage/>} />
      </Routes>
    </Router>
  )
}

export default App
