import { useState } from 'react'
import Install from './pages/Install'
import Routing from './Routing';
import { UserContext } from './components/UserContext'




function App() {
  const [account, setAccount] = useState(null);

  const connectuser = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }], // chainId must be in hexadecimal numbers
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x13881',
                rpcUrl: 'https://polygon-mumbai.g.alchemy.com/v2/KBBUDl6m0-m8bWd3GGWU-eniZKy1elh4',
              },
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      } else if (error.code === -32002) {

      }
      console.error(error);
    }
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
