const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "CodeFolio Backend is running 🚀"
  });
});

// Contact API
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email and message are required"
    });
  }

  console.log("New Contact Message:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);

  res.json({
    success: true,
    message: "Message received successfully 🚀"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});