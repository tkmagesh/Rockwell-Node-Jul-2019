const express = require('express'),
	router = express.Router(),
	taskService = require('../services/taskService');



router.get('/', (req, res, next) => {
	res.json(taskService.getAll());
});

router.get('/:id', (req, res, next) => {
	const taskId = parseInt(req.params.id),
		task = taskService.get(taskId);
	if (task){
		res.json(task);
	} else {
		res.status(404).end();
	}
});

router.post('/', (req, res, next) => {
	const taskData = req.body;
	let newTask = taskService.addNew(taskData);
	res.status(201).json(newTask);
});


router.put('/:id', (req, res, next) => {
	const taskId = parseInt(req.params.id),
		taskDataToUpdate = req.body;
	let updatedTask = taskService.update(taskId, taskDataToUpdate);

	if (updatedTask){
		res.json(updatedTask);
	} else {
		res.status(404).end();
	}
});

router.delete('/:id', (req, res, next) => {
	const taskId = parseInt(req.params.id);
	try{
		taskService.remove(taskId)
		res.json(null);
	} catch(err) {
		res.status(404).end();
	}
});

module.exports = router; 