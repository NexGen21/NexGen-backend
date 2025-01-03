const express = require('express');
const router = express.Router();

const Contact = require('./models/ContactModel')

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Contact API' });
});

router.post('/', async (req, res) => {
    const { name, email, subject, msg } = req.body
    console.log(req.body);
    let emptyFields = []
    if(!name) {
        emptyFields.push('name')
    }
    if(!email) {
        emptyFields.push('email')
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({error: "Please provide your name and email", emptyFields})
    }
    try {
        const cont = await Contact.create({ name, email, subject, msg })
        return res.status(200).json(cont);
    }
    catch(error) {
        return res.status(400).json({error: error.message})
    }
})

module.exports = router;