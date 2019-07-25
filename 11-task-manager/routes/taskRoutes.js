const express = require('express'),
	router = express.Router();

let taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Explore Node.js', isCompleted : true}
];

router.get('/', (req, res, next) => {
	res.json(taskList);
});

router.get('/:id', (req, res, next) => {
	const taskId = parseInt(req.params.id),
		task = taskList.find(task => task.id === taskId);
	if (task){
		res.json(task);
	} else {
		res.status(404).end();
	}
});

router.post('/', (req, res, next) => {
	const taskData = req.body;
	taskData.id = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
	taskList.push(taskData);
	res.status(201).json(taskData);
});


router.put('/:id', (req, res, next) => {
	const taskId = parseInt(req.params.id),
		taskDataToUpdate = req.body;
	const task = taskList.find(task => task.id === taskId);
	if (task){
		taskList = taskList.map(tk => tk.id === taskId ? taskDataToUpdate : tk );
		res.json(taskDataToUpdate);
	} else {
		res.status(404).end();
	}
});

router.delete('/:id', (req, res, next) => {
	const taskId = parseInt(req.params.id);
	const task = taskList.find(task => task.id === taskId);
	if (task){
		taskList = taskList.filter(tk => tk.id !== taskId);
		res.json(null);
	} else {
		res.status(404).end();
	}
})

module.exports = router; 