const router = require('express').Router();
let Project = require('../models/project.model');

router.route('/').get((req,res) => {
    Project.find()
        .then(projects => res.json(projects))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/getTasks/:id').get((req,res) => {
    Project.findById(req.params.id)
        .then(project => res.json(project))
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


router.route('/addTask/:id').post((req,res) => {
    Project.findByIdAndUpdate(req.params.id,
        {$push:
        {"tasks": {taskTitle: req.body.taskTitle, 
        taskDescription: req.body.taskDescription, 
        priority: req.body.priority}}},
        {safe:true, upsert:true, new:true} )
        .then(() => res.json('Task Added'))
        .catch(err => res.status(400).json('Error '+ err))
})

router.route('/:id').post((req,res) => {
    Project.findByIdAndUpdate(req.params.id,
        {$pull:
        {"tasks": {"_id": req.body._id}}},
        {new:true} )
        .then(() => res.json('Task array Updated'))
        .catch(err => res.status(400).json('Error '+ err))
    
})






module.exports = router