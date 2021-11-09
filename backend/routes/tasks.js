const router = require('express').Router();
let Task = require('../models/task.model');

router.route('/').get((req,res) => {
    Task.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req,res) => {

    const title = req.body.title;
    const description = req.body.description;
    const priority = req.body.priority
    const projectId = req.body.projectId;

    const newTask = new Task({
        title,
        description,
        priority,
        projectId
    })

    newTask.save()
    .then(()=> res.json('Project Added'))
    .catch((err => res.status(400).json('Error: ' + err)))
})



module.exports = router