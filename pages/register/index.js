import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const { address, isConnected, connector } = useAccount();

  function initUser(hash, walletId) {
    fetch ('/api/initUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': process.env.NEXT_PUBLIC_AUTH_TOKEN
      },
      body: JSON.stringify({
        hash,
        walletId
      })
    }).then(response => {
      if (response.ok) {
        console.log('User initialized successfully');
      } else {
        console.error('User not initialized');
      }
    });
  }

  useEffect(() => {
    if (!localStorage.getItem('hash')) {
      window.location.href = '/';
    }
    if (isConnected && address) {
      console.log(`Connected to wallet ID: ${address}`);
      localStorage.setItem('walletId', address);
      initUser(localStorage.getItem('hash'), address);
      window.location.href = '/files';
    }
  }, [isConnected, address, connector]);

  return (
    <main className='container'>
      <div className='logo'>
        <img src='assets/images/valtlog.svg' alt='valt logo'/>
      </div>
      <p className='title-bold'><br /></p>
      <p className="title-medium">Connect your wallet</p>
      <p className="title-medium">to register your valt™️</p>
      <br />
      <ConnectButton />
    </main>
  );
}
