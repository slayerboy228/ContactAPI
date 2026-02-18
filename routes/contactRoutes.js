const express = require('express');
const contactController = require('../controllers/contactController');
const { isAuthenticate } = require('../middleware/auth');
const router = express.Router();

router.post('/save', isAuthenticate, contactController.save);
router.get('/getAllContact', contactController.getAllContact);
router.get('/getContact/:id', contactController.getContact);
router.put('/updateContact/:id', contactController.updateContact);
router.delete('/deleteContact/:id', contactController.deleteContact);

module.exports = router;