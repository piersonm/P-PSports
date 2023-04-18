import React, { Component } from 'react';
import './App.css';
import { BrowserRouter , Routes, Route } from "react-router-dom";
import Dashboard from './containers/dashboard';
import Header from './containers/header';


class App extends Component {

  render() {
    return (
      <div>
        <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={
                    <div className="App">
                        <Header />
                    </div>
                }
                />
        </Routes>
        </BrowserRouter>
      </div>
      
    );
  }
}

export default App;


// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
  
// export default function ButtonAppBar() {
//     return (
//         <AppBar>
//             <Toolbar>
//                 <IconButton
//                     size="large"
//                     edge="start"
//                     color="inherit"
//                     aria-label="menu"
//                     sx={{ mr: 2 }}
//                 >
//                     <MenuIcon />
//                 </IconButton>
//                 <Typography variant="h6" 
//                     component="div" sx={{ flexGrow: 1 }}>
//                     Geeksforgeeks
//                 </Typography>
//                 <Button color="inherit">Logout</Button>
//             </Toolbar>
//         </AppBar>
//     );
// }