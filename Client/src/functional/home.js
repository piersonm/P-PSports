import { Link } from '@material-ui/core';
import React, { Component } from 'react';

class Home extends Component {
    render() {
        return(
            <div>
                <Link to='/' style={{padding: '5px'}}>
                    Dutch Oven Bets
                </Link>
            </div>
        )}
}

export default Home;