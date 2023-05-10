import React, { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
} from 'firebase/auth';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className='form-group'>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          className='form-control'
          placeholder='Email...'
        />
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          className='form-control my-2'
          placeholder='Password...'
        />
      </div>
      <div className='form-group'>
        <button type='button' onClick={signIn} className='btn btn-primary mx-1'>
          SignIn
        </button>
        <button
          type='button'
          onClick={signInWithGoogle}
          className='btn btn-success mx-1'
        >
          Sign in with Google
        </button>
        <button type='button' onClick={logOut} className='btn btn-danger'>
          SignOut
        </button>
      </div>
    </div>
  );
};

export default Auth;
