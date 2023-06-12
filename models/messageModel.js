const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Entrez votre Prénom"],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(v)
            }
        }
    },
    name: {
        type: String,
        required: [true, "Entrez votre Nom"],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(v)
            }
        }
    },
    email: {
        type: String,
        required: [true, "Entrez votre email"],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(v);
            }
        }
    },
    message: {
        type: String,
        required: [true, "Rédigez votre message"]
    }
})