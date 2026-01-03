# X042

## Descripción

Proyecto inspirado por el tutorial de Gilbers Ahumada https://www.youtube.com/watch?v=Su5Io0fBloo&list=PL2uIxLJ7G8e3iOqPOqMN41L1oz8A69Ln_&index=2 

Es un ejemplo sencillo de uso del protocolo x402 que permite el pago, en USDC, por el consumo de un servicio REST usando https://x402.org/facilitator 

## How2Run

Configura los .env 
Arranca el seller (server que expone el endpoint /weather) con npm run dev
Ejecuta el buyer con npm run dev

## Test

http://localhost:4021/weather
https://sepolia.basescan.org/address/0x77ec1a9eadd7be6bffdfb737f4a32be0cd748aa6#tokentxns
