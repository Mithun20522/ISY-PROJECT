import { Link } from 'react-router-dom'
import img1 from '../../public/homeImg.png'
const Login = () => {
  return (
    <div className='flex sm:justify-between justify-center items-center min-h-screen bg-slate-300'>
      <img src={img1} alt="image" className='hidden sm:block w-[50vw] h-[100vh]' />
      <form className='flex flex-col gap-3 sm:absolute sm:right-28 sm:top-52'>
        <h1 className='text-center mb-5 text-3xl font-semibold'>Login to your account</h1>
        <input className='bg-white outline-none px-32 py-3 rounded-md shadow-md' type="email" placeholder='Email' />
        <input className='bg-white outline-none px-32 py-3 rounded-md shadow-md' type="password" placeholder='password' />
        <button type='submit' className='bg-purple-600 p-3 rounded-md text-sm font-semibold text-white hover:bg-purple-700 transition-all duration-200 ease-in-out'>Login</button>
        <div className='flex gap-2 mr-10'>
          <p className='text-sm font-semibold'>Don{"'"}t have an account ?</p>
          <Link className='text-sm text-blue-600 hover:underline' to={'/signup'}>Sign up</Link>
        </div>
      </form>
    </div>
  )
}

export default Login