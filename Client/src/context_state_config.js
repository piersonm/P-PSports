import React, { userReducer } from 'react';
import Context from './utils/context';
import * as ACTIONS from './store/actions/actions';

import * as Reducer1 from './store/reducers/plain_reducers';
import * as AuthReducer from './store/reducers/auth_reducers';
import * as FormReducer from './store/reducers/form_reducers';

import Auth from './utils/auth';

const auth = new Auth();

const ContextState = () => {
    /** 
     * Plain Reducer
     */
    
   const [stateReducer1, dispatchReducer1] = userReducer(Reducer1.Reducer1, Reducer1.initialState)

   const handleDispatchTrue = () => {
    dispatchReducer1(ACTIONS.success())
   }

   const handleDispatchFalse = () => {
    dispatchReducer1(ACTIONS.failure())
   }

   /**
    * Auth Reducer: Update user authentication state (logged in or not) and add/remove user profile date from global state
    */
   
   const [stateAuthReducer, dispatchAuthReducer] = userReducer(AuthReducer.AuthReducer, AuthReducer.initialState);

   const handleLogin = () => {
    dispatchAuthReducer(ACTIONS.login_success())
   }

   const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.login_failure())
   }

   const handleAddProfile = (profile) => {
    dispatchAuthReducer(ACTIONS.add_profile(profile))
   }

   const handleRemoveProfile = () => {
    dispatchAuthReducer(ACTIONS.remove_profile())
   }

   /**
    * Form Reducer
    */

   const [stateFormReducer, dispatchFormReducer] = userReducer(FormReducer.FormReducer, FormReducer.initialState);

   const handleFormChange = (event) => {
    dispatchFormReducer(ACTIONS.user_input_change(event.target.value))
   };

   const handleFormSubmit = (event) => {
    event.preventDefault(); //prevent page from reloading
    event.persist();
    dispatchFormReducer(ACTIONS.user_input_submit(event.target.value))
   };

   //Handle authentication from callback
   const handleAuthentication = (props) => {
    if(props.location.hash) {
        auth.handleAuth()
    }
   }

   return(
    <div>
    <Context.Provider
        value={{
          //Reducer1
          stateProp1: stateReducer1.stateprop1,
          stateProp2: stateReducer1.stateprop2,
          dispatchContextTrue: () => handleDispatchTrue(),
          dispatchContextFalse: () => handleDispatchFalse(),

          //Form Reducer
          useContextChangeState: stateFormReducer.user_textChange,
          useContextSubmitState: stateFormReducer.user_textSubmit,
          useContextSubmit: (event) => handleFormSubmit(event),
          useContextChange: (event) => handleFormChange(event),

          //Auth Reducer
          authState: stateAuthReducer.is_authenticated,
          profileState:  stateAuthReducer.profile,
          handleUserLogin: () => handleLogin(),
          handleUserLogout: () => handleLogout(),
          handleUserAddProfile: (profile) => handleAddProfile(profile),
          handleUserRemoveProfile: () => handleRemoveProfile(),

          //Handle auth
          handleAuth: (props) => handleAuthentication(props),
          authObj: auth
        }}>
        <Routes />
    </Context.Provider>
    </div>
  )
}


export default ContextState;
