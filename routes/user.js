const express = require('express');
const router = express.Router();

var todoModel = require('../models/tasks');


router.get('/', (req, res) =>{
    todoModel.find({}, (err,data)=>{
        if(err) throw err;
        res.render("index", {list: data})	
    })
});

router.post('/', (req, res) =>{
    var newtask = new todoModel();
    newtask.task = req.body.task;
    newtask.save().then((result) => { 
        console.log("Record added!");
        res.redirect('/'); 
    }).catch((err) => { console.log(err); });
});

router.get('/edit/:task', (req, res) =>{
    task = req.params.task;
    todoModel.find({}, (err,data)=>{
        if(err) throw err;
        res.render("update", {list: data, task: task});	
    })
});

router.post('/edit/:id', (req, res) =>{
    var task = req.body.task;
    var task_id = req.params.id;
    console.log(task,task_id);
    todoModel.findByIdAndUpdate(task_id,{task : task},async (err, res) => { 
        if (err){ 
            console.log(err) 
        } 
        else{ 
            console.log("Record updated!");
        } 
    });
    res.redirect('/');
});

router.get('/remove/:task', (req, res) =>{
    var task = req.params.task;
    console.log(task);
    todoModel.deleteOne({task : task})
    .then(async () => {
        console.log("Record deleted!");
        res.redirect('/');
    }).catch( (err) => {
        console.log(err);
    });
});

router.get('/taskdone/:task', (req, res) =>{
    var task = req.params.task;
    console.log(task);
    todoModel.updateOne({task : task}, {isDone: true})
    .then(async () => {
        console.log("Record updated!");
        res.redirect('/');
    }).catch( (err) => {
        console.log(err);
    });
});

module.exports = router;