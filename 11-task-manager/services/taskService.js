const db = require('./db');

var taskList = [];

function getAll(){
	return db.getData();
}

async function get(taskId){
	let taskList = await db.getData();
	return taskList.find(task => task.id === taskId);
}

async function addNew(taskData){
	let taskList = await db.getData();
	let newTaskId = taskList.reduce((result, task) => result > task.id ? result : task.id, 0) + 1;
	let newTask = { ...taskData, id : newTaskId }
	taskList.push(newTask);
	await db.saveData(taskList);
	return newTask;
}

async function update(taskId, taskDataToUpdate){
	let taskList = await db.getData();
	const task = taskList.find(task => task.id === taskId);
	if (task){
		taskList = taskList.map(tk => tk.id === taskId ? taskDataToUpdate : tk );
		await db.saveData(taskList);
		return taskDataToUpdate;
	} else {
		return null;
	}
}

async function remove(taskId){
	let taskList = await db.getData();
	const task = taskList.find(task => task.id === taskId);
	if (task){
		taskList = taskList.filter(tk => tk.id !== taskId);
		return db.saveData(taskList);
	} else {
		throw new Error('Task not found');
	}
}

module.exports = { getAll, addNew, update, remove, get };