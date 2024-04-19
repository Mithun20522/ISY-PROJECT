import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PeerConnect from './pages/PeerConnect';
import PageNotFound from './pages/PageNotFound';
import Resources from './pages/Resources';
import WellBeing from './pages/WellBeing';
import Header from './components/Header';
import Footer from './components/Footer';
import {Toaster} from 'react-hot-toast';
import ChatRoom from './pages/ChatRoom';
import { useSelector } from 'react-redux';

const App = () => {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/peer-connect' element={<PeerConnect/>} />
      <Route path='/resources' element={<Resources/>} />
      <Route path='/well-being' element={<WellBeing/>} />
      {currentUser && currentUser.rest && <Route path='/chatroom' element={<ChatRoom/>} />}
      <Route path='*' element={<PageNotFound/>} />
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App