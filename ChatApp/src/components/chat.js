import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';


const Chat = ({chatroom}) => {
const [newMessage, setNewMessage] = useState('');
const [msg, setMsg] = useState([]);

const messageRef = collection(db, "messages");


useEffect(() => {
  const queryMessage = query(messageRef, where("room", "==", chatroom),orderBy("createAt"));

  const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
    let msg = [];
    snapshot.forEach((doc) => {
        msg.push({...doc.data(), id: doc.id});
    });
    console.log("messagesData");
    setMsg(msg)
})

  return () => unsubscribe();
    
  
},[]);



const handleSubmit = async (e) => {
  e.preventDefault();
  if (newMessage === '') return;

  await addDoc(messageRef, {
    text: newMessage,
    createAt: serverTimestamp(),
    user: auth.currentUser.displayName,
    room: chatroom,
  });

  setNewMessage("");
};

  return (
    <div className='container p-3 my-3 border border-primary'>
      <div className='text-center border border-primary bg-primary text-white'>
      <h1>Welcome to: {chatroom.toUpperCase()}</h1>
    </div>
    <div >
      {msg.map((x) => (
        <div key={x.id}>
          <span className='font-weight-bold font-italic' >{x.user}:</span> {x.text}
        </div>
      ))}
    </div>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            onChange={(e) => setNewMessage(e.target.value)}
            className='form-control'
            placeholder='Type your message here...'
          />
          <button
            type='submit'
            className='form-control btn btn-sm btn-secondary py-2'
          >
            Send <i className='fa fa-paper-plane'></i>
          </button>
        </div>
      </form>

      
    </div>
  );
}

export default Chat