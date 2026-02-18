const mongoose = require('mongoose');
const { type } = require('os');

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    bloodgroup: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId },
    createdAt: { type: Date, default: Date.now() }
});

const Contact = mongoose.model('contact', contactSchema);
module.exports = Contact;