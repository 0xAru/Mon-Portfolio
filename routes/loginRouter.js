const adminModel = require('../models/adminModel');
const loginRouter = require('express').Router();
const transporter = require('../services/nodemailer');

loginRouter.get('/login', (req, res) => {
    try {
        res.render('pages/login.twig');
    } catch (error) {
        res.send(error);
    }
})

// Route pour la connexion de l'administrateur
loginRouter.post('/login', async (req, res) => {
    try {
        // Vérifier si l'administrateur existe
        const admin = await adminModel.findOne({ email: req.body.email });

        if (admin) {
            if (admin.password == req.body.password) {
                req.session.adminId = admin._id;
                return res.redirect("/adminDashboard");
            } else {
                return res.status(401).send({ message: 'Mot de passe incorrect.' });
            }
        } else {
            return res.status(404).send({ message: 'Admin inconnu.' });
        }
    } catch (error) {
        res.status(500).send({ message: 'Erreur lors de la connexion.' });
    }
});

loginRouter.post("/message",async (req,res)=>{
    try {
        let mailOptions = {
            from: req.body.email,
            to: 'lolavilatte@gmail.com',
            subject: 'Nouveau message - Portfolio',
            text: `Vous avez reçu un nouveau message de : ${req.body.name}.
            Email : ${req.body.email}
            Message : ${req.body.message}`,
        };
        await transporter.sendMail(mailOptions);
        req.session.mailMessage = "Message envoyé, Je vous recontacte dès que possible"
    } catch (error) {
        req.session.mailMessage = "Votre message n'a pas pu être envoyé"
    }
    res.redirect('/#contact')
})

module.exports = loginRouter;
