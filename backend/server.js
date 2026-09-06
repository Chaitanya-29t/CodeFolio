const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const userRoutes = require("./routes/userRoutes");
const projectRoutes = require("./routes/projectRoutes");
const skillRoutes = require("./routes/skillRoutes");
const habitRoutes = require("./routes/habitRoutes");

const app = express();

// ===============================
// MIDDLEWARE
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// API ROUTES
// ===============================
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/habits", habitRoutes);

// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.json({
    message: "CodeFolio Backend is running 🚀"
  });
});

app.get("/api/habit-check", (req, res) => {
  res.json({
    success: true,
    message: "Habit route is reaching server 🚀"
  });
});

// ===============================
// CONTACT API
// ===============================
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Name, email and message are required",
    });
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Message from ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    });

    res.json({
      success: true,
      message: "Message sent successfully 🚀",
    });
  } catch (error) {
    console.log("Email sending failed:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
    });
  }
});

// ===============================
// SERVER + MONGODB
// ===============================
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    tls: true,
    tlsAllowInvalidCertificates: true,
    family: 4,
    serverSelectionTimeoutMS: 15000,
  })
  .then(() => {
    console.log("MongoDB connected successfully 🚀");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error.message);
  });