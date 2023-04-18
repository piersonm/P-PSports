import auth0 from 'auth0-js';
import history from './history';

export default class Auth {
    //initialize Auth0 app
    auth0 = new auth0.WebAuth({
        domain: 'webapp.auth0.com',
        clientID: '',
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile email'
    })

    //empty object to hold user profile data
    userProfile ={}

    //brings up login widget
    login = () => {
        this.auth0.authorize()
    }

    //saves id and access tokens
    handleAuth = () => {
        this.auth0.parseHash((err, authResult) => {
            if(authResult) {
                localStorage.setItem('access_token', authResult.accessToken)
                localStorage.setItem('id_token', authResult.idToken)

                let expiresAt = JSON.stringify((authResult.expiresIn * 1000 + new Date().getTime()))
                localStorage.setItem('expiresAt', expiresAt)

                this.getProfile();
                setTimeout(() => { history.replace('/authcheck') }, 600);
            } else {
                console.log(err)
            }
        })
    }

    //get access tokens from local storage
    getAccessToken = () => {
        if(localStorage.getItem('access_token')) {
            const accessToken = localStorage.getItem('access_token')
            return accessToken
        } else {
            return null
        }
    }

    //parse access token to get user profile data
    getProfile = () => {
        let accessToken = this.getAccessToken()
        if(accessToken) {
            this.auth0.client.userInfo(accessToken, (err, profile) => {
                if(profile) {
                    this.userProfile = { profile }
                }
            })
        }
    }

    //logs user out by removing token
    logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expiresAt')
        setTimeout(() => { history.replace('/authcheck') }, 200);
    }

    //makes sure user is logged in
    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem('expiresAt'))
        return new Date.getTime() < expiresAt
    }
}