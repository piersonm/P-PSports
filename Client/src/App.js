import React, { Component } from 'react';
import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Header from './containers/header';
import NBA from './pages/NBA/NBA';


class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
        <Header />
        <Routes>
            <Route exact path="/NBA" element={<div className="NBA"><NBA /></div>}/>
                
        </Routes>
        </BrowserRouter>
      </div>
      
    );
  }
}

export default App;
