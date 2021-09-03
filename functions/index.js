const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const { response } = require("express");
const stripe = require("stripe")(
  "sk_test_51H30t6EgeRexmKh6ILYQehvA6ZNKUTZjfbRcBtgDzBxWPexKwT4eo5WeCHACnxHMpIAgZXZqmujcRGzpuTEwuRXx00sJK4kZbk"
);

// API

//- App Config
const app = express();

//- Middlwares
app.use(cors({ origin: true }));
app.use(express.json());

//- API routes
app.get("/", (request, response) => response.status(200).send("hello world"));


app.get('/test', (request, response) => response.send('Hello  '));


/* app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log('Payment Request receved BOM !!!', total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total, // subunits of the currency
    currency: "usd",
  });

  // OK - Created
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
}); */

//- Listen command
exports.api = functions.https.onRequest(app);

// http://localhost:5001/clone-70932/us-central1/api