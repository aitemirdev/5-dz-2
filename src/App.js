import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersPage from "./pages/userPage/UserPage";
import Menu from './components/Menu';
import MainPageDZ from "./pages/MainPageDZ";

function App() {
    return (
        <BrowserRouter>
            <Menu />
            <Routes>
                <Route index element={<MainPageDZ />} />
                <Route path='/users' element={<UsersPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
