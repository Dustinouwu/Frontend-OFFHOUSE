import React, { useReducer } from 'react';

import { AuthContext } from './AuthContext';
import { authReducer } from './authReducer';
import { types } from './types';


const AuthProvider = ({ children }) => {
    // https://tutorial.tips/double-exclamation-mark-not-not-operator-in-javascript/
    /*token     Bearer 48|AUibuTGApYcBhT7vpJg4mJo9LK9xS7j018KEEvfD */
    /*user    {"id":15,"username":"Mrs. Madeline Hamill Sr.","full_name":"Meda Labadie","email":"kling.curt@example.net","role":"customer","home_phone":"022973641","personal_phone":"0965710660","address":"332 Jacobs Grove"} */
    const initialization = () => {
        const user = JSON.parse(localStorage.getItem('user'))
        return {
            logged: !!user,
            user: user,
        }
    }

    // Uso del useReducer
    const [authState, dispatch] = useReducer(authReducer, {}, initialization)


    const login = async (user, token) => {
        const action = { type: types.login, payload: user }
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        dispatch(action);
    }

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        const action = { type: types.logout }
        dispatch(action)
    }


    return (
        <AuthContext.Provider value={{
            ...authState,
            login: login,
            logout: logout,

        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider