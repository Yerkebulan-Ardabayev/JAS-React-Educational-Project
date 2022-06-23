import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { HomePage } from "./pages/HomePage";
import { Header } from "./components/Header";
import { SingleProductPage } from "./pages/SingleProductPage"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="home" element={<HomePage />} />
          <Route path="product/:itemId" element={<SingleProductPage />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
