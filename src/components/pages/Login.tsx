import { useContext } from "react";
import AuthContext from "../../store/Auth/auth-context";
import GoogleIcon from "../utils/GoogleIcon";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const loginHandler = async () => {
    authCtx.logIn();
  };

  return (
    <div className="max-w-6xl mx-auto flex items-center justify-center h-[80vh]">
      <div className="shadow-lg rounded-lg bg-white p-10 flex flex-col ">
        <h2 className="text-2xl">🍩 Sign in to continue</h2>
        <button
          onClick={loginHandler}
          className="flex gap-2 justify-between px-6 py-3 mt-4 mx-auto font-semibold text-gray-900 bg-white border-2 border-gray-500 rounded-md shadow outline-none hover:bg-blue-50 hover:border-blue-400 focus:outline-none"
        >
          <GoogleIcon />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
