import { Link } from "react-router-dom";
import img1 from "../../public/homeImg.png";
const SignUp = () => {
  return (
    <div className="flex sm:justify-between justify-center items-center min-h-screen bg-slate-300">
      <img
        src={img1}
        alt="image"
        className="hidden sm:block w-[50vw] h-[100vh]"
      />
      <form className="flex flex-col gap-3 sm:absolute sm:right-28 sm:top-52">
        <h1 className="text-center mb-5 text-3xl font-semibold">
          Sign up to your account
        </h1>
        <input
          className="bg-white outline-none px-32 py-3 rounded-md shadow-md"
          type="text"
          placeholder="Enter username"
        />
        <input
          className="bg-white outline-none px-32 py-3 rounded-md shadow-md"
          type="email"
          placeholder="Enter email"
        />
        <input
          className="bg-white outline-none px-32 py-3 rounded-md shadow-md"
          type="password"
          placeholder="Enter password"
        />
        <button
          type="submit"
          className="bg-purple-600 p-3 rounded-md text-sm font-semibold text-white hover:bg-purple-700 transition-all duration-200 ease-in-out"
        >
          Create Account
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
