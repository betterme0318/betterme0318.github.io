import React, { useEffect, useState } from 'react';
import Login from './Components/Login';
import QueryList from './Components/QueryList';

function App() {
  const [curHash, setCurHash] = useState('')
  useEffect(() => {
    window.location.hash = '#/login'
    const onChange = () => {
      setCurHash(window.location.hash.slice(1))
    }
    onChange()
    window.addEventListener('hashchange', onChange)
    return () => {
      window.removeEventListener('hashchange', onChange)
    }
  }, [])

  return (
    <div>
      {curHash === '/login' && <Login />}
      {curHash === '/querylist' && <QueryList />}
    </div>
  );
}

export default App;
