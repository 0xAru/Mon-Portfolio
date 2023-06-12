const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Le titre est requis"],
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.?'-]+$/u.test(v)
            }
        }
    },
    url: {
        type: String,
        // required: [true, "L'URL du projet est requise"],
        // validate: {
        //     validator: function(v) {
        //         return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
        //     }
        // }
    },
    description: {
        type: String,
        required: [true, "Une description est requise"],
    },
    techno: {
        type: String,
        required: [true, "Listez les technos utilisées"],
    },
    image: {
        type: String,
    }
})

const projectModel = mongoose.model("project", projectSchema);
module.exports = projectModel;
