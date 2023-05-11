import React, { useEffect, useState } from 'react'
import { auth, db } from '../config/firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';


const Chat = ({chatroom}) => {
const [newMessage, setNewMessage] = useState('');
const [msg, setMsg] = useState([]);

const messageRef = collection(db, "messages");


useEffect(() => {
  const queryMessage = query(messageRef, where("room", "==", chatroom),orderBy("createdAt"));

  const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
    let messagesData = [];
    snapshot.forEach((doc) => {
        messagesData.push({...doc.data(), id: doc.id});
    });
console.log(messagesData);
    setMsg(messagesData)
})

  return () => unsubscribe();
    
  
}, []);



const handleSubmit = async (e) => {
  e.preventDefault();
  if (newMessage === '') return;

  await addDoc(messageRef, {
    text: newMessage,
    createAt: serverTimestamp(),
    user: auth.currentUser.displayName,
    room: chatroom,
  });

  setNewMessage('');
};

  return (
    <div className='container border border-warning py-3 my-3'>
      <div className='header'>
        <h1 className='text-center'>Welcome to: {chatroom.toUpperCase()}</h1>
      </div>
      <div className='messages'>
        {msg.map((message) => (
          <div key={message.id} className='message'>
            <span className='user'>{message.user}:</span> {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} method='post'>
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
            Send <i className='fa fa-paper-plane' aria-hidden='true'></i>
          </button>
        </div>
      </form>
    </div>
  );
}

export default Chat