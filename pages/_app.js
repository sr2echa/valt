import { ThirdwebProvider } from '@thirdweb-dev/react';
import '../styles/globals.css';

const activeChain = 'ethereum';

// import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import "@rainbow-me/rainbowkit/styles.css";

// import {
//   apiProvider,
//   configureChains,
//   getDefaultWallets,
//   midnightTheme,
//   RainbowKitProvider,
// } from "@rainbow-me/rainbowkit";
// import { WagmiProvider } from 'wagmi';
// import {
//   sapolia,
//   polygon,
//   optimism,
//   arbitrum,
//   base,
// } from 'wagmi/chains';
// import {
//   QueryClientProvider,
//   QueryClient,
// } from "@tanstack/react-query";

// // const { connectors } = getDefaultWallets({
// //   appName: "My RainbowKit App",
// //   chains,
// // });

// // const wagmiClient = createClient({
// //   autoConnect: true,
// //   connectors,
// //   provider,
// // });

// const config = getDefaultConfig({
//   appName: 'vadapav',
//   projectId: '8d10889dc1cff1dccd22f96eb90da30f',
//   chains: [sapolia, polygon, optimism, arbitrum, base],
//   ssr: true,
// });

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
  appName: 'RainbowKit demo',
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

// function MyApp({ Component, pageProps }) {
//   return (
    

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
