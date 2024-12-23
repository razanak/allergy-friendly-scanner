const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Import CORS

const app = express();
const PORT = 3030;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());
app.use(express.static("public")); // Serve static files from /public


// API Route to fetch product by barcode
app.get("/api/product/:barcode", async (req, res) => {
  const barcode = req.params.barcode;
  const apiUrl = `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 1) {
      res.json(data.product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
