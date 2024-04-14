import { Link, useNavigate } from "react-router-dom";
import img1 from "../../public/homeImg.png";
import { useState } from "react";
import toast from "react-hot-toast";
import {useDispatch, useSelector} from 'react-redux';
import { loginInFail, loginInStart, loginInSuccess } from "../redux/user/userSlice";
const Login = () => {
  const [userData, setUserData] = useState({
    email:'',
    password:''
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading} = useSelector((state) => state.user);

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        dispatch(loginInStart());
        const res = await fetch('http://localhost:3000/api/auth/signin',{
          method: 'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify(userData)
        });
        const data = await res.json();
        if(res.ok){
          toast.success(data.message);
          dispatch(loginInSuccess(data));
          navigate('/');
          return;
        }
        else{
          toast.error(data.message);
          dispatch(loginInFail(data.message));
          return;
        }

    } catch (error) {
      console.log(error.message);
      dispatch(loginInFail(error.message));
      toast.error(error.message);
    }
}
const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]:e.target.value
    });
}

  return (
    <div className="flex sm:justify-between justify-center w-full min-h-screen bg-slate-300">
      <img
        src={img1}
        alt="image"
        className="hidden sm:block w-[50vw] h-[100vh]"
      />
      <form className="flex flex-col gap-3 mt-24 sm:mr-28" onSubmit={handleSubmit}>
        <h1 className="text-center mb-5 text-3xl font-semibold">
          Login to your account
        </h1>
        <input
          className="bg-white outline-none px-32 py-3 rounded-md shadow-md"
          type="email"
          id="email"
          required
          onChange={(e) => handleChange(e)}
          placeholder="Email"
        />
        <input
          className="bg-white outline-none px-32 py-3 rounded-md shadow-md"
          type="password"
          id="password"
          required
          onChange={(e) => handleChange(e)}
          placeholder="password"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 p-3 rounded-md text-sm font-semibold text-white hover:bg-purple-700 transition-all duration-200 ease-in-out"
        >
           {loading ? 'Loading...' : 'Log in'}
        </button>
        <div className="flex gap-2 mr-10">
          <p className="text-sm font-semibold">Don{"'"}t have an account ?</p>
          <Link
            className="text-sm text-blue-600 hover:underline"
            to={"/signup"}
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
