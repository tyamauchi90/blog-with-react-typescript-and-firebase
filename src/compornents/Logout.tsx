import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

type LogoutProps = {
  setIsAuth: (isAuth: boolean) => void;
};

const Logout: React.FC<LogoutProps> = ({ setIsAuth }) => {
  const navigate = useNavigate();
  const logout = () => {
    //ログアウト処理
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login");
    });
  };
  return (
    <div>
      <p>ログアウト</p>
      <button onClick={logout}>ログアウト</button>
    </div>
  );
};

export default Logout;
