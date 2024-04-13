import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PeerConnect from './pages/PeerConnect';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/peer-connect' element={<PeerConnect/>} />
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
  )
}

export default App