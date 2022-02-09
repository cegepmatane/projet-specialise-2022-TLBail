import { useState } from 'react'
import logo from './logo.svg'
import Home from './components/Home'
import Install from './components/Install'

function App() {
  const [account, setAccount] = useState();

  const connectuser = async () => {
    const [accounto] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounto);
  };

  if (window.ethereum) {

    connectuser();

    return (
      <div>
        <Home />
      </div>
    );

  } else {
    return <Install />;
  }

}

export default App
