import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate(); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
      navigate("/"); 
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded-md">
      Logout
    </button>
  );
};

export default Logout;
