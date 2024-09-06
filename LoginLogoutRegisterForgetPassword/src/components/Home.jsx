import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Link } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(null); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); 
      } else {
        setUser(null); 
      }
    });

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold">Home Page</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          <p>Your User ID: {user.uid}</p>
          <Link to='/logout' className="bg-red-400 text-white p-2 border-2 border-gray-500 ">Logout</Link>
        </div>
      ) : (
        <p>No user found. Please login or register.  <Link to='/login' className="bg-blue-400 p-2 border-2 border-gray-500">Login</Link></p>
      
      )}
    </div>
  );
};

export default Home;
