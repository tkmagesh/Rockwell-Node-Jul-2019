const express = require('express'),
	router = express.Router();

const taskList = [
	{id : 1, name : 'Learn JavaScript', isCompleted : false},
	{id : 2, name : 'Explore Node.js', isCompleted : true}
];

router.get('/', (req, res, next) => {
	res.json(taskList);
});

module.exports = router; 