import './App.css';
import { Routes, Route } from "react-router-dom";
import {Navbar} from "./components/Navbar";
import {MoviesPage} from "./pages/MoviesPage";
import {MoviePage} from "./pages/MoviePage";
import {RickAndMorty} from "./pages/RickAndMorty";
import {SignInPage} from "./pages/SignInPage";
import {Auth} from "./context/Auth";
import {useState} from "react";
import {Counter} from "./components/Counter";
import {TodoPage} from "./pages/TodoPage";

function App() {
    const [token, setToken] = useState(localStorage.getItem('idToken'))

    return (
        <Auth.Provider value={{ token, setToken }}>
            <div className="App">
                <Navbar />

                <Routes>
                    <Route path="/movies" element={<MoviesPage />} />
                    <Route path="/movies/:id" element={<MoviePage />} />
                    <Route path="/rickandmorty/" element={<RickAndMorty />} />
                    <Route path="/signin/" element={<SignInPage />} />
                    <Route path="/counter/" element={<Counter />} />
                    <Route path="/todo" element={<TodoPage />} />
                </Routes>
            </div>
        </Auth.Provider>
    );
}

export default App;
