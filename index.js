// Load environment variables from the .env file
require('dotenv').config();

const express = require('express'); // Import express
const Stripe = require('stripe'); // Import Stripe
const cors = require('cors'); // Import CORS middleware

const app = express(); // Create an express app
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Initialize Stripe with your secret key

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Endpoint to create a checkout session
app.get('/' , async (req, res) => {
   return res.json({ message: 'Server is up and running!' });
})
app.get('/create-checkout-session' , async (req, res) => {
   return res.json({ message: 'Server  !' });
})
app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/success`,  // Replace with your actual success URL
      cancel_url: `${process.env.CLIENT_URL}/cancel`,    // Replace with your actual cancel URL
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error.message);
    console.error('Request body:', req.body);
    res.status(500).json({ error: error.message });
  }
});



// Start the server
const PORT = process.env.PORT || 3001; // Set the port to either the specified environment variable or default to 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log the server start message
});
