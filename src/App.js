import './App.css';
import { Routes, Route, Navigate} from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { MoviesPage } from "./pages/MoviesPage";
import { MoviePage } from "./pages/MoviePage";
import { Auth } from "./context/Auth";
import { useState } from "react";
import { CinemaPages } from "./pages/CinemaPages";
import { BreakingBadCharPage } from './pages/BreakingBadCharPage';
import { ShopModule } from "./components/shop/ShopModule";
import { LoginPage } from "./pages/LoginPage";

function App() {
    const [token, setToken] = useState(localStorage.getItem('idToken'))   
    
    return (
        <Auth.Provider value={{ token, setToken }}>
            <div className="App">
                <Navbar />
                <Routes>
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:id" element={<MoviePage />} />
                    <Route path="/cinema/" element={<CinemaPages />} />
                    <Route path="/cinema/:id" element={<BreakingBadCharPage />} />
                    <Route path="/shop" element={<ShopModule />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element="Registration Page" />                
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Auth.Provider>
    );
}
export default App;
