import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Evento from "./pages/Evento";
import Zonas from "./pages/Zonas";
import Pago from "./pages/Pago";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/evento/:id" element={<Evento />} />
          <Route path="/zonas/:id" element={<Zonas />} />
          <Route path="/pago/:id" element={<Pago />} />
        </Routes>
      </main>
    </>
  );
}

export default App;