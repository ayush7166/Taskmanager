const mongoose = require('mongoose');

const tasksSchema = mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        default:"pending"
    },
    dueDate:{
        type:Date,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }
});

module.exports = mongoose.model('Task',tasksSchema);