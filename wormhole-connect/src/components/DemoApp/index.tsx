import { NttRoute } from '@wormhole-foundation/sdk-route-ntt';
import React from 'react';
import './styles.css';

import { WormholeConnectConfig } from 'config/types';
import WormholeConnect from '../../WormholeConnect';



import { nttRoutes } from 'routes/operator';

const routeConfig : NttRoute.Config= {
	tokens:{
		FTT_NTT:[
			{
				chain: 'Polygon',
				token: '0xAC0F66379A6d7801D7726d5a943356A172549Adb',
				manager: '0x2006B44684b2A579466fC04FAbC5A535946bC7AB',
				transceiver: [
					{
						address: '0x997ecCd76bf0afb55F89f6b3efDCE3B9EA70D6b1', // transceivers address from deployment.json
						type: 'wormhole'
					}
				]
			},
			{
				chain: 'Solana',
				token: '7JA5eZdCzztSfQbJvS8aVVxMFfd81Rs9VvwnocV1mKHu',
				manager: 'ntTrjS9nYGsRCijV3v6Ks4QgMcEWp1SkoVnoTj4zxPJ',
				transceiver: [
					{
						address: 'PXrqZfBN36PZDJM7yMtERDa92fVmzkzdWfBvYihA7zk', // transceivers address from deployment.json
						type: 'wormhole'
					}
		  		],
				quoter: 'Nqd6XqA8LbsCuG8MLWWuP865NV6jR1MbXeKxD4HLKDJ'
			}
		]
	}
};

const parseConfig : WormholeConnectConfig = {
	network: 'Mainnet', // from deployment.json of the NTT deployment directory
	chains: ['Polygon', 'Solana'], // from https://github.com/wormhole-foundation/wormhole-connect/blob/development/wormhole-connect/src/config/testnet/chains.ts#L170
	rpcs: {
		Solana: 'https://staked.helius-rpc.com?api-key=a9d0d5ed-f7ae-43fe-9883-b2503bfdc4d6',
		Polygon: 'https://polygon-mainnet.g.alchemy.com/v2/z5HT06sWY-ixggzSPRw2rCy0B75MOki6'
	}, 
	// tokens: ['GEODpol', 'GEODsol'], 
	routes: [...nttRoutes(routeConfig)], // from https://github.com/wormhole-foundation/wormhole-connect/blob/d7a6b67b18db2c8eb4a249d19ef77d0174deffbe/wormhole-connect/src/config/types.ts#L70
	// isRouteSupportedHandler:routeSupportedHandler,
	tokensConfig: {
	    GEODpol: {
	        key: 'GEODpol',
	        symbol: 'GEOD',
	        nativeChain: 'Polygon',
	        displayName: 'GEOD (Polygon)',
	        tokenId: {
	        	chain: 'Polygon',
	            address: '0xAC0F66379A6d7801D7726d5a943356A172549Adb' // token address
	        },
	        coinGeckoId: 'geodnet',
	        icon: 'https://www.geodnet.com/metadataimg/GEODNET.svg',
	        color: '#00C3D9',
	        decimals: 18
	    },
	    GEODsol: {
	        key: 'GEODsol',
	        symbol: 'GEOD',
	        nativeChain: 'Solana',
	        displayName: 'GEOD (Solana)',
	        tokenId: {
	            chain: 'Solana',
	            address: '7JA5eZdCzztSfQbJvS8aVVxMFfd81Rs9VvwnocV1mKHu' // token address
	        },
	        coinGeckoId: 'geodnet',
	        icon: 'https://www.geodnet.com/metadataimg/GEODNET.svg',
	        color: '#00C3D9',
	        decimals: 9
	    }
	},
	ui: {
		title: '',
		menu: [],
		defaultInputs:{
			fromChain: 'Polygon',
			toChain: 'Solana',
		},
		walletConnectProjectId:"2e9865daf298b82271cad95d869c9093",
		showHamburgerMenu: false,
	}
};


function DemoApp() {



  return (
    <>

      <article>
        <div id="demo-contents">

            <WormholeConnect  config={parseConfig} />

        </div>

      </article>
    </>
  );
}

export default DemoApp;
