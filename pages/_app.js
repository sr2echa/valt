import { ThirdwebProvider } from '@thirdweb-dev/react';
import './globals.css';
import 'tailwindcss/tailwind.css';
import './getstarted.css';
import './page.module.css'

const activeChain = 'ethereum';

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  polygonMumbai,
  base,
  polygon
} from 'wagmi/chains';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'vadapav',
  ssr: false,
  projectId: '8d10889dc1cff1dccd22f96eb90da30f',
  chains: [
    polygon,
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
