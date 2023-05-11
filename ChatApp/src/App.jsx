import React, { useRef, useState } from 'react';
import Auth from './components/auth';
// import { auth } from './config/firebase'; 

import Cookies from 'universal-cookie';
import Chat from './components/chat';
 
const cookies = new Cookies();

const App = () => {
const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
const [room, setRoom] = useState(null);

const roomInput = useRef(null);

  if (!isAuth) {
    return (
      <div className='container'>
        <h2 className='text-center'>Chat App</h2>
        <Auth setIsAuth ={setIsAuth}/>
      </div>
    );
  } else {
    return <>
      {room ? (<div> <Chat chatroom = {room} /> </div>) : (<div className="form-group text-center w-25">
        <label htmlFor='name'>Enter Chatroom Name</label>
        <input type="text"
          className="form-control " name="name" id="name" ref={roomInput}/>
        <button  onClick={() => setRoom(roomInput.current.value)} className="form-control my-2 btn btn-sm btn-success">Enter Chat</button>
      </div>)}
    </>
  }



};

export default App;
