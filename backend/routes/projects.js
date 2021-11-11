const router = require('express').Router();
let Project = require('../models/project.model');

router.route('/').get((req,res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req,res) => {

    const title = req.body.title;
    const description = req.body.description;

    const newProject = new Project({
        title,
        description,
    })

    newProject.save()
    .then(()=> res.json('Project Added'))
    .catch((err => res.status(400).json('Error: ' + err)))
})

router.route('/:id').delete((req,res) => {
    Project.findByIdAndDelete(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error ' + err))
})



module.exports = router