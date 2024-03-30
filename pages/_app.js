import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';

const activeChain = 'ethereum';

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  arbitrum,
  base,
  mainnet,
  optimism,
  polygon
} from 'wagmi/chains';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'vadapav',
  projectId: '8d10889dc1cff1dccd22f96eb90da30f',
  chains: [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    base,
  ],
});

const queryClient = new QueryClient();


function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebProvider
			activeChain={activeChain}
			clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
		>
			<WagmiProvider config={config}>
      			<QueryClientProvider client={queryClient}>
					<RainbowKitProvider coolMode>
						<Component {...pageProps} />
					</RainbowKitProvider>
				</QueryClientProvider>
			</WagmiProvider>
		</ThirdwebProvider>
	);
}

export default MyApp;
