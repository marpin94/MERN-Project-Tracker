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

    const newProject = new Project({
        ...req.body
    })

    newProject.save()
    .then((data)=> res.json(data))
    .catch((err => res.status(400).json('Error: ' + err)))
})

router.route('/:id').delete((req,res) => {
    Project.findByIdAndDelete(req.params.id)
    .then(project => res.json(project))
    .catch(err => res.status(400).json('Error ' + err))
})


router.route('/updateTask/:id').post((req,res) => {
   Project.updateOne(
       {'_id': req.params.id, 'tasks._id':req.body._id},
       {$set: {"tasks.$.complete": true}}
   )
        .then(()=> res.json('Task Marked Complete'))
        .catch(err => res.status(400).json('Error ' + err))
})






module.exports = router