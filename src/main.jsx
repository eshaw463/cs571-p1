import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './main/Layout.jsx';
import App from './pages/App.jsx';
import AddMedia from './pages/AddMedia.jsx';
import NotFound from './pages/NotFound.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<App />} />
                    <Route path="add-media" element={<AddMedia />} />

                    {/* Any other path shows the 404 page. */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </StrictMode>
);
