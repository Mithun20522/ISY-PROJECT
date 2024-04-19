import { Link, useNavigate } from "react-router-dom";
import img1 from "../../public/homeImg.png";
import toast from "react-hot-toast";
import { useState } from "react";
const SignUp = () => {
  const [userData, setUserData] = useState({
    username:'',
    email:'',
    password:''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
      e.preventDefault();
      try {
          setLoading(true);
          const res = await fetch('https://mindlink-backend.onrender.com/api/auth/signup',{
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body:JSON.stringify(userData)
          });
          const data = await res.json();
          setLoading(false)
          if(res.ok){
            toast.success(data.message);
            navigate('/login');
            return;
          }
          else{
            toast.error(data.message);
            return;
          }

      } catch (error) {
        console.log(error.message);
        setError(error.message);
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
    <div className="flex sm:justify-between justify-center min-h-screen bg-slate-300">
      <img
        src={img1}
        alt="image"
        className="hidden sm:block w-[50vw] h-[100vh]"
      />
      <form className="flex flex-col gap-3 mt-24 sm:mr-28" onSubmit={handleSubmit}>
        <h1 className="text-center mb-5 text-3xl font-semibold">
          Sign up to your account
        </h1>
        <input
          className="bg-white outline-none px-32 py-3 rounded-md shadow-md"
          type="text"
          id="username"
          required
          onChange={(e) => handleChange(e)}
          placeholder="Enter username"
        />
        <input
          className="bg-white outline-none px-32 py-3 rounded-md shadow-md"
          type="email"
          id="email"
          required
          onChange={(e) => handleChange(e)}
          placeholder="Enter email"
        />
        <input
          className="bg-white outline-none px-32 py-3 rounded-md shadow-md"
          type="password"
          id="password"
          required
          onChange={(e) => handleChange(e)}
          placeholder="Enter password"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-600 p-3 rounded-md text-sm font-semibold text-white hover:bg-purple-700 transition-all duration-200 ease-in-out"
        >
          {loading ? 'Loading...' : 'Create Account'}
        </button>
        <div className="flex gap-2 mr-10">
          <p className="text-sm font-semibold">Already have an account ?</p>
          <Link className="text-sm text-blue-600 hover:underline" to={"/login"}>
            Log in
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
