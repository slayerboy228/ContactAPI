const Contact = require('../model/Contact');

// API - /api/contact/save
const save = async (req, res) => {
    const { name, email, mobile, bloodgroup } = req.body;
    if (name == "" || email == "" || mobile == "" || bloodgroup == "") {
        return res.json({
            message: "All Field is required",
            status: false
        });
    }
    const checkData = await Contact.findOne({ email });
    if (checkData) {
        return res.json({ message: 'user already exits' });
    }
    const contact = await Contact.create({ name, email, mobile, bloodgroup });
    res.json({
        message: 'Contact Saved Successfully',
        status: true,
        contact: contact
    })
}

// API - /api/contact/getAllContact
const getAllContact = async (req, res) => {
    const contacts = await Contact.find();
    if (!contacts) {
        return res.status(404).json({ message: 'no data found' });
    }
    res.json({ message: 'All Contact Fetch', contacts: contacts, status: true });
}

// API - /api/contact/getContact/:id
const getContact = async (req, res) => {
    const contact = await Contact.findOne({ email: req.params.id });
    // const id = req.params.id;
    // const contact = await Contact.findById({ _id: id });
    if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
    }
    res.json({
        message: 'contact found',
        contact: contact
    });
}

// API - /api/contact/updateContat/:id
const updateContact = async (req, res) => {
    const id = req.params.id;
    const { name, email, mobile, bloodgroup } = req.body;
    const updateContact = await Contact.findByIdAndUpdate(id, {
        name, email, mobile, bloodgroup
    }, { new: true });
    res.json({
        message: 'Contact updated',
        newContact: updateContact
    });
}

// API - /api/contact/deleteContact/:id
const deleteContact = async (req, res) => {
    const id = req.params.id;
    const delContact = await Contact.findByIdAndDelete(id);
    if (delContact) {
        return res.json({
            message: 'Deleted Successfully',
            status: true
        });
    }
    res.json({
        message: 'cannot delete contact',
    });
}

module.exports = { save, getAllContact, getContact, updateContact, deleteContact };