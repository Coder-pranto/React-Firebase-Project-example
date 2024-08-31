import { useState } from 'react';
import './App.css';
import app from './firebase.init';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

function App() {
  const [userData, setUserData] = useState(null);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignUp = async () => { 
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log('Successfully signed in, The user is : ', result.user);
      setUserData(result.user);

    } catch (error) {
      console.error('Error signing in:', error.code, error.message);
    }
  };

  const handleGithubSignUp = async () => { 
    try {
      const result = await signInWithPopup(auth, githubProvider);
      console.log('Successfully signed in, The user is : ', result.user);
      setUserData(result.user);
    } catch (error) {
      console.error('Error signing in:', error.code, error.message);
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold">
        Multiple user authentication
      </h1>
      <div className="mt-4">
        <button onClick={handleGoogleSignUp} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Sign up with Google
        </button>
        <button onClick={handleGithubSignUp} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4">
          Sign up with GitHub
        </button>

        {userData && (
          <div>
            <p>{userData.displayName}</p>
            <p>{userData.email}</p>
            <img src={userData.photoURL} alt="profile_pic" />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
