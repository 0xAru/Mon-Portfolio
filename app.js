const express = require ('express');
const mongoose = require ('mongoose');
const session = require ('express-session');
const projectRouter = require('./routes/projectRouter');
const loginRouter = require('./routes/loginRouter');
require('dotenv').config();

const app = express();

app.use(express.static("assets"));
app.use(session({secret: process.env.SECRET_SESSION, resave: false, saveUninitialized: true}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next){ 
//récupère la session utilisateur si connecté sur toutes les pages
    res.locals.session = req.session
    next()
})
app.use(projectRouter);
app.use(loginRouter);

// app.all('*', (req, res) => {
//     res.redirect('/home')
// })

app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log(err);
    } else {
        console.log(`Connecté au port ${process.env.PORT}`);
    }
})

try {
    mongoose.connect(process.env.BDD_URI);
    console.log("Connecté à la base de données");
} catch (error) {
    console.log(error);
}