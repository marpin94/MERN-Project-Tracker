const mongoose = require('mongoose');
const {ObjectId} = require('mongodb')
const Schema = mongoose.Schema;


const projectSchema = new Schema({
    title: {type:String, required: true},
    description:{type:String, required: false},
    pinned:{type:Boolean, default:false}
}, {
    timestamps:true,
})


const Project = mongoose.model('Project', projectSchema);

module.exports = Project;