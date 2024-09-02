
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const Logout = () => {
  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out");
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
