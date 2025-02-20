require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contactRoutes = require("./routes/ContactRoutes");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(cors({
    origin: 'https://testdeploiement-ruby.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined"));

// Routes
app.use("/api/contacts", contactRoutes);

// Connexion à MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connecté"))
  .catch((err) => console.error("❌ Erreur MongoDB :", err));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`✅ Serveur en marche sur le port ${PORT}`));
