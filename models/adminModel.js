const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Entrez votre email"],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9.%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(v);
            }
        }
    },
    password: {
        type: String,
        required: [true, "Entrez votre mot de passe"],
        validate: {
            validator: function(v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v);
            }
        }
    }
})

const adminModel = mongoose.model("admins", adminSchema);
module.exports = adminModel;