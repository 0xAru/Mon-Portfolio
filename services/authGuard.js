const adminModel = require("../models/adminModel")

let authGuard = async (req, res, next) => {
    let admin = await adminModel.findById(req.session.adminId)
    if (admin) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = authGuard;