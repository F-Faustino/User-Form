import React from 'react';
import './App.css';
import './i18n';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./routes/Home/Home";
import Revisited from './routes/Revisited/Revisited';
import withAuth from './routes/withAuth';
import ErrorPage from './routes/ErrorPage/ErrorPage';

const ProtectedRevisited = withAuth(Revisited, ErrorPage);

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" Component={Home} />
          <Route path="/revisited" Component={ProtectedRevisited} />
          <Route path="/errorPage" Component={ErrorPage} />
      </Routes>
	  </BrowserRouter>
  );
}

export default App;
