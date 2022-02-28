import { useState } from 'react'
import Install from './pages/Install'
import Routing from './Routing';
import { UserContext } from './components/UserContext'




function App() {
  const [account, setAccount] = useState(null);

  const connectuser = async () => {
    const [accounto] = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounto);
    UserContext.connectUser();
  };

  if (window.ethereum) {
    connectuser();
  }
  else {
    window.addEventListener('ethereum#initialized', connectuser,
      { once: true, });
  }

  return (
    account ? <Routing /> : <Install />
  );

}


export default App
