import './App.css';
import React, {useState, useEffect} from 'react';
import Sitebar from './home/Navbar';
import Auth from './auth/Auth';

function App() {
  const [sessionToken, setSessionToken] = useState("")

  //Runs once the initial component loads, it updates the sessionToken state variable if Chrome saved a token in local storage.
  //Because we pass an empty array as second argument, there is no change our effect is tracking to re-run later
  useEffect(() => {
    if(localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"))
    }
  }, [])

  //Takes a token and saves in two places
  const updateToken = (newToken) => {
    //Updated the local storage and the useState
    localStorage.setItem("token", newToken)
    setSessionToken(newToken)
    console.log(sessionToken)
  }

  return (
    <div className="App">
      <Sitebar />
      <Auth />
    </div>
  );
}

export default App;
