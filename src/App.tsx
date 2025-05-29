// App.tsx 또는 App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserPage from './UserPage';
import Admin from './Admin';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}