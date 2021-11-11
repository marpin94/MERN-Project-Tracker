const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')
const Schema = mongoose.Schema;


const projectSchema = new Schema({
    title: {type:String, required: true},
    description:{type:String, required: true},
    tasks:[
        {
            taskTitle: {type:String},
            priority: {type:String},
            taskDescription:{type:String}
        }
    ]
}, {
    timestamps:true,
})


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;