import React from 'react';
import { auth, googleProvider } from '../config/firebase';
import {
  signInWithPopup,
} from 'firebase/auth';

import Cookies from 'universal-cookie';
 
const cookies = new Cookies();
 
const Auth = ({setIsAuth}) => {
  
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <>
    <div className='text-center my-3'>
      <button type="button" onClick={signInWithGoogle} className="btn btn-primary btn-sm "> SignUp with Google</button>
    </div>
      
    </>
  );
};

export default Auth;
