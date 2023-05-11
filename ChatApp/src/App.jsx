import React, { useRef, useState } from 'react';
import Auth from './components/auth';
 import { auth } from './config/firebase'; 

import Cookies from 'universal-cookie';
import Chat from './components/chat';
import { signOut } from 'firebase/auth';
 
const cookies = new Cookies();

const App = () => {
const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
const [room, setRoom] = useState(null);

const roomInput = useRef(null);


  const logOut = async () => {
    try {
      await signOut(auth);
      cookies.remove("auth-token");
      setIsAuth(false);
      setRoom(null);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isAuth) {
    return (
      <div className='container'>
        <h2 className='text-center'>Chat App</h2>
        <Auth setIsAuth ={setIsAuth}/>
      </div>
    );
  } else {
    return <>
      {room ? (<div> <Chat chatroom={room} /> </div>) : (<div className='container text-center'><div className="form-group w-50 m-auto">
        <label htmlFor='name' className='h3'>Enter Chatroom Name</label>

        <input type="text"
          className="form-control " name="name" id="name" ref={roomInput} />
        <button onClick={() => setRoom(roomInput.current.value)} className="form-control my-2 btn btn-sm btn-success">Enter Chat</button>
      </div></div>)}

      <div className='text-center'>
        <button onClick={logOut} className='btn btn-sm btn-danger'>Sign Out</button>
      </div>
    </>
  }



};

export default App;
