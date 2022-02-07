import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';

import App from './App';

import Posts from "./components/Posts.js";
import Login from "./components/Login.js";
import Dashboard from './components/Dashboard.js';
import DBHome from './components/DBHome.js';

import { GlobalProvider } from "./contexts/GlobalContext.js";
import { PostsProvider } from "./contexts/PostsContext.js";


ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <PostsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" element={<Posts dashboard={false}/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />}>
                <Route path="/dashboard" element={<DBHome />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </PostsProvider>
    </GlobalProvider>

  </React.StrictMode>,
  document.getElementById('root')
);
