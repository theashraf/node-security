import mongoose from 'mongoose';
import Joi from "joi"
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

const addNewContactSchema = Joi.object.keys({
    firstName: Joi.string().min(2).max(50).alphanum().trim().required(),
    lastName: Joi.string().min(2).max(50).alphanum().trim().required(),
    email: Joi.string().email(),
    company: Joi.string().min(3).max(255).alphanum().trim(),
    phone: Joi.number(),
    created_at: Joi.date()
})

const updateContactSchema = Joi.object.keys({
    firstName: Joi.string().min(2).max(50).alphanum().trim(),
    lastName: Joi.string().min(2).max(50).alphanum().trim(),
    email: Joi.string().email(),
    company: Joi.string().min(3).max(255).alphanum().trim(),
    phone: Joi.number(),
    created_at: Joi.date()
})

export const addNewContact = (req, res) => {
    const { error , value : contactData } = Joi.validate(req.body,addNewContactSchema);

    if(error) {
        return res.send(error.details[0].message)
    }

    let newContact = new Contact(contactData);

    newContact.save((err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

export const getContacts = (req, res) => {
    Contact.find({}, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
};

export const getContactWithID = (req, res) => {
    Contact.findById(req.params.contactId, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    });
}

export const updateContact = (req, res) => {
    const { error, value : contactData } = Joi.validate(req.body,updateContactSchema);

    if(error) {
        return res.send(error.details[0].message)
    }
    
    Contact.findOneAndUpdate({ _id: req.params.contactId}, contactData, { new: true }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json(contact);
    })
}

export const deleteContact = (req, res) => {
    Contact.remove({ _id: req.params.contactId }, (err, contact) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted contact'});
    })
}