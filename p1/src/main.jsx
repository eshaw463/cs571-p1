import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddMedia from './pages/AddMedia.jsx';
import NotFound from './pages/NotFound.jsx';
import App from './pages/App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route
                    index path="/add-media"
                    element={<AddMedia />}
                />
                {/* Any other path shows the 404 page. */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
