import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

function App() {
    return (
    <Routes>
        <Route path="/" element={<HomeAppPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
    </Routes>
    )
}

export default App;