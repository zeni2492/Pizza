import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { HistoryPage } from "./pages/HistoryPage";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route>
                    <Route index element={<Home />} />
                    <Route element={<About />} path="about" />
                    <Route element={<HistoryPage />} path="history" />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
