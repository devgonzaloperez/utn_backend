const Contact = require('../model/Contact');

const getAllContacts = async (req, res) => {
    const contacts = await Contact.find({userID: req.user});
    if (!contacts) return res.status(204).json({'message': 'No Contacts found'});
    res.status(200).json(contacts);
};

const createNewContact = async (req, res) => {
    if (!req?.body?.name || !req?.body?.phone || !req?.body?.email) {
        return res.status(400).json({'message': 'Name, phone and e-mail are required'});
    }

    try {
        const result = await Contact.create({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            userID: req.user //email!
        });

        if(result){
            res.status(201).json({'message': 'Contact was created'});
        }


    } catch (err) {
        res.status(500).json(err);
    }
}

const updateContact = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({'message': 'ID parameter is required'});
    }

    const contact = await Contact.findOne({_id: req.body.id}).exec();
    if (!contact){
        return res.status(204).json({"message": `No contact matches ID ${req.body.id}.`});
    }
    if (req.body?.name) contact.name = req.body.name;
    if (req.body?.phone) contact.phone = req.body.phone;
    if (req.body?.email) contact.email = req.body.email;
    const result = await contact.save();
    res.json(result);
}

const deleteContact = async (req, res) => {
    console.log(req.body);
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Contact ID required.' });

    const contact = await Contact.findOne({_id: req.body.id}).exec();
    if (!contact) {
        return res.status(204).json({ "message": `No contacts matches ID ${req.body.id}.` });
    }
    const result = await contact.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getContact = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Contact ID required.'});

    const contact = await Contact.findOne({_id: req.params.id}).exec();
    if (!contact) {
        return res.status(204).json({ "message": `No contact matches ID ${req.params.id}.` });
    }
    res.json(contact);
}

module.exports = {
    getAllContacts,
    createNewContact,
    updateContact,
    deleteContact,
    getContact
}