import React, { Component } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import history from './utils/history';

import AuthCheck from './utils/authcheck';

import Home from './pages/home';
import Header from './containers/header';
import HooksContainer1 from './containers/hook1';
import Callback from './containers/callback';
import HooksForm from './containers/hooks_form1';
import PrivateComponent from './containers/privatecomponent';
import Profile from './containers/profile';
import NBA from './pages/NBA/NBA';

import Posts from './Blog/posts';
import AddPost from './Blog/addpost';
import ShowPost from './Blog/showpost';
import EditPost from './Blog/editpost';


import Auth from './utils/auth';
import TeamPage from './pages/TeamPage';
import BoxScore from './pages/NBA/BoxScore';

export const auth = new Auth()

const handleAuthentication = (props) => {
  if(props.location.hash) {
    auth.handleAuth()
  }
}

const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth.isAuthentication === true
    ? <Component auth={auth} {...props} />
    : <Redirect to={{pathname:'/redirect'}} />
  }
  />
)



class Routes extends Component {
    componentDidMount() {
      if(auth.isAuthenticated()) {
        this.props.login_success()
        auth.getProfile()
        setTimeout(() => {this.props.add_profile(auth.userProfile)}, 400)
      }
      else {
        this.props.login_failure()
        this.props.remove_profile()
      }
    }

    render() {
      return(
        <div>
          <Router history={history} >
          <Header />
          <br />
          <br />
          <div>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path="/NBA" component={NBA}/>
              <Route path="/:league/gameID/:id/boxscore" component={BoxScore} />
              <Route Route exact path="/:league/TeamPage/:teamAbbreviation" component={TeamPage}/>


            </Switch>
          </div>
          </Router>
        </div>
  )}
 }

export default Routes;