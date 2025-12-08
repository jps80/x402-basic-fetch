import {config} from 'dotenv';
import {
    wrapFetchWithPayment,
    decodeXPaymentResponse,
    createSigner
} from 'x402-fetch';

import { createPublicClient, http } from 'viem'
import { baseSepolia } from 'viem/chains'

config(); // Load environment variables from .env file

const PRIVATE_KEY = process.env.PRIVATE_KEY || '';
const URL_SELLER = process.env.URL_SELLER || '';
//const ADDRESS_SELLER = process.env.ADDRESS_SELLER || '';
//const ADDRESS_BUYER = process.env.ADDRESS_BUYER || '';
console.log("URL_SELLER:", URL_SELLER);

const client = createPublicClient({ 
  chain: baseSepolia, 
  transport: http(), 
}) 

if (!PRIVATE_KEY) {
    throw new Error('Please set your PRIVATE_KEY in the .env file');
}

async function main() {
    // Create a signer using the private key from environment variables
    const signer = await createSigner('base-sepolia',PRIVATE_KEY,);
    // Wrap the fetch function with payment capabilities
    const paidFetch = wrapFetchWithPayment(fetch, signer);
    
    console.log('Making a paid request to the protected endpoint...');
    
    paidFetch(URL_SELLER, { method: 'GET' })
    
    .then(async (response: { ok: any; statusText: any; status: any; headers: { get: (arg0: string) => any; }; json: () => any; }) => {
        if (!response.ok) {
            console.error('Failed to fetch:', response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse and log the JSON response
        const data = await response.json();
        console.log('Response Data:', data);

        // Decode any payment-related headers from the response
        const paymentInfo = decodeXPaymentResponse(response.headers.get('x-payment-response') || '');
        console.log('Payment Info:', paymentInfo);
 
    }).catch((error: any) => {
        console.error('Error making paid request:', error);
    });
}

main().catch((error) => {
    console.error('Error in main execution:', error);
}); 
