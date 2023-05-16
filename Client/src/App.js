import React from 'react';
import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Header from './containers/header';
import NBA from './pages/NBA/NBA';
import BoxScore from './pages/NBA/BoxScore';


export default function App() {
    return (
      <div>
        <BrowserRouter>
        <Header />
        <Routes>
            <Route exact path="/NBA" element={<div className="NBA"><NBA /></div>}/>
            <Route exact path="/:league/gameID/:id/boxscore" element={<div className='BoxScore'><BoxScore/></div>} />
        </Routes>
        </BrowserRouter>
      </div>
      
    );
  }


