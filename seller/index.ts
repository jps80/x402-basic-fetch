import {config} from 'dotenv';
import express from 'express';
import {paymentMiddleware} from 'x402-express';
import { type Hex } from "x402-fetch";

config(); // Load environment variables from .env file

const app = express();
const port = 3001;
const SELLER_ADDRESS =process.env.SELLER_ADDRESS as Hex | string;
const URL_FACILITATOR = process.env.URL_FACILITATOR as `${string}://${string}`;
console.log("SELLER_ADDRESS:", SELLER_ADDRESS);
console.log("URL_FACILITATOR:", URL_FACILITATOR); 

// Configure the payment middleware
app.use(paymentMiddleware(
  (SELLER_ADDRESS as Hex),
  {  // Route configurations for protected endpoints
    "GET /weather": {
      // USDC amount in dollars
      price: "$0.001",
      network: "base-sepolia", // for mainnet, see Running on Mainnet section
    },
  },
  {
    url: URL_FACILITATOR, // for testnet
  }
));

// Implement your route
app.get("/weather", (req, res) => {
  console.log("Received paid request for /weather");
  res.send({
    report: {
      weather: "sunny",
      temperature: 70,
    },
  });
});

app.listen(port, () => {
  console.log(`Seller server is running at http://localhost:${port}`);
});
