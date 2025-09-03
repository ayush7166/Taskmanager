const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
const auth = require("../middleware/auth.middleware")

// const app = express();
// app.use(express.json());
router.use(auth);

router.get('/',async(req,res)=>{
    try {
        const userId = req.user.id;
        const tasks = await Task.find({userId});

        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

router.post('/',async(req,res)=>{
    const userId = req.user.id;
    if(!userId){
        return console.log("user id is required");

    }
   
    
    
    
    
    
    try {
    const task= new Task({...req.body,userId});
    const saveTask = await task.save();
    res.status(201).json(saveTask);
} catch (error) {
    res.status(400).json({message:error.message});
}
})

router.patch('/:id',async(req,res)=>{
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(updatedTask);
    } catch (error) {
    res.status(400).json({message:error.message});
        
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
    res.status(400).json({message:error.message});
        
    }
})

module.exports = router