import { useEffect } from 'react';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Home() {
  const { address, isConnected, connector } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      console.log(`Connected to wallet ID: ${address}`);
      localStorage.setItem('walletId', address);
      window.location.href = '/files';
    }
  }, [isConnected, address, connector]);

  return (
    <main>
      <h1>Welcome to <span>valt.</span></h1>
      <ConnectButton />
    </main>
  );
}
