import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';

import App from './App';

import Posts from "./components/Posts.js";
import Login from "./components/Login.js";

import { GlobalProvider } from "./contexts/GlobalContext.js"


ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Posts />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
