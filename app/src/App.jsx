import { useState } from 'react'
import Install from './pages/Install'
import Routing from './Routing';

function App() {
  const [account, setAccount] = useState(null);

  const connectuser = async () => {
    const [accounto] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounto);
  };

  if (window.ethereum) connectuser();

  return (
    account ? <Routing /> : <Install />
  );

}


export default App
