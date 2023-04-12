import './App.css';
import Login from './components/Login';
import { useState } from 'react';
import { Routes, Route ,useLocation } from 'react-router-dom';
import Home from './components/Home';
import Movies from './components/Movies';
import Nav_bar from './components/Navbar';
import Footer from './components/Footer';
import Commuinty from './components/Commuinty';
import Button from './components/Button';
import SignUp from './components/SignUp';
import Currentuser from './Currentuser';

function App() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const handleUserCreated = (users) => {
    setUser([...user, users]);
  };
  const handleLogin = (user) => {
    setUser(user);
    setIsLoggedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
  };
  const athome = location.pathname.includes('/home')
  const atmovie = location.pathname.includes('/home/movies')
  const atcommunity = location.pathname.includes('/home/commuinty')

  return (
    <>
    
      <div className="overlay"></div>
      <Routes>
        <Route path='/' element={<Home />}/>
        {/* <Route path='/User' element={<Currentuser />}/> */}
        <Route path='/Login' element={<Login OnuserCreated={handleUserCreated} />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/home/movies'element={<Movies/>} />
        <Route path='/home/commuinty'element={<Commuinty/>} />
      </Routes>
      {atcommunity && <Nav_bar/>}
      {atcommunity && <Footer/>}
      {atcommunity && <Button/>}
      {athome && atmovie && <Button />}
      {athome &&atmovie  && <Footer/>}
      {athome && atmovie && <Nav_bar />}
    </>
  );
}

export default App;
