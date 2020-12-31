const { response } = require('express');
const ContactUs = require('../models/ContactUs');

// exports.getLogo = async (req, res) => {
//     try {
//         const logo = await Logo.find()
//         res.json(logo)
//     } catch (err) {
//         console.log(err);
//     }
// }

exports.postContactUs = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        const contactUs = new ContactUs({
            name : name,
            email: email,
            subject : subject,
            message : message
        })

        const response = await contactUs.save();

        if(response){
            res.json({
                message: "Your message has been sent."
            })
        } else {
            res.json({
                message: "Your message has been sent."
            })
        }    
    } catch (err) {
        res.json({
            message: "error"
        })
    }
}