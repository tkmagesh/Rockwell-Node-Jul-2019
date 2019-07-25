const db = require('./db');

var taskList = [];

function getAll(){
	return db.getData();
}

function get(taskId){
	return taskList.find(task => task.id === taskId);
}

function addNew(taskData){
	let newTaskId = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
	let newTask = { ...taskData, id : newTaskId }
	taskList.push(newTask);
	return newTask;
}

function update(taskId, taskDataToUpdate){
	const task = taskList.find(task => task.id === taskId);
	if (task){
		taskList = taskList.map(tk => tk.id === taskId ? taskDataToUpdate : tk );
		return taskDataToUpdate;
	} else {
		return null;
	}
}

function remove(taskId){
	const task = taskList.find(task => task.id === taskId);
	if (task){
		taskList = taskList.filter(tk => tk.id !== taskId);
	} else {
		throw new Error('Task not found');
	}
}

module.exports = { getAll, addNew, update, remove, get };