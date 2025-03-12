import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/index/index.tsx";
import Poem from "./pages/poem/poem.tsx";
import User from "./pages/user/user.tsx";
import "./App.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/poems" element={<Poem />} />
                <Route path="/users" element={<User />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;