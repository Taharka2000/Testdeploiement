const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// Récupérer tous les contacts
router.get("/", async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
});

// Ajouter un contact
router.post("/", async (req, res) => {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.json(newContact);
});

// Modifier un contact
router.put("/:id", async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedContact);
});

// Supprimer un contact
router.delete("/:id", async (req, res) => {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact supprimé" });
});

module.exports = router;