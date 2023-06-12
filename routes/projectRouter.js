const projectModel = require('../models/projectModel');
const adminModel = require('../models/adminModel');
const authGuard = require('../services/authGuard');
const projectRouter = require('express').Router();
const upload = require('../services/multer');

projectRouter.get('/adminDashboard', authGuard, async (req, res) => {
    try {
        let errors = req.session.errors
        delete req.session.errors
        let projects = await projectModel.find();
        res.render('pages/adminDashboard.twig', {
            projects: projects,
            errors: errors
        })
    } catch (error) {
        res.send(error);
    }
})

projectRouter.get("/", async (req, res) => {
    try {
        let mailMessage = null
        if (req.session.mailMessage) {
            mailMessage = req.session.mailMessage
        }
        delete req.session.mailMessage
        let projects = await projectModel.find();
        res.render('pages/home.twig', {
            projects: projects,
            mailMessage: mailMessage
        })
        delete req.session.mailMessage
    } catch (error) {
        res.send(error);
    }
})

projectRouter.post('/addProject', upload.single("image"), (req, res) => {
    try {
        if (req.file.filename) {
           req.body.image = req.file.filename;
        }
        let newProject = new projectModel(req.body);
        let error = newProject.validateSync();
        if (error) {
            throw error;
        }
        newProject.save();
        res.redirect('/');
    } catch (error) {
        req.session.errors = error.errors;
        res.redirect('/adminDashboard');
    }
})

projectRouter.get('/updateProject/:id', async (req, res) => {
    try {
        let project = await projectModel.findOne({ _id: req.params.id });
        res.render("pages/adminDashboard.twig", {
            project: project
        })
    } catch (error) {
        res.send(error);
    }
})

projectRouter.post("/updateProject/:id", upload.single("image"), async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.filename;
        }
        await projectModel.updateOne({ _id: req.params.id }, req.body);
        res.redirect('/');
    } catch (error) {
        res.json(error);
    }
})

projectRouter.get('/deleteProject/:id', async (req, res) => {
    try {
        await projectModel.deleteOne({ _id: req.params.id });
        res.redirect("/adminDashboard");
    } catch (error) {
        res.send(error);
    }
})

module.exports = projectRouter;