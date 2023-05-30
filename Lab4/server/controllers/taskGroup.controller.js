const db = require('../db');

class TaskGroupController {
  async createTaskGroup(req, res) {
    const { name, user_id } = req.body;
    const newTaskGroup = await db.query(`INSERT INTO task_group(name, user_id) VALUES($1, $2);`, [name, user_id]);
    res.json('taskGroup Created');
  }

  async getTaskGroups(req, res) {
    const taskGroups = await db.query(`SELECT * FROM task_group`);
    res.json(taskGroups.rows);
  }

  
  async getOneTaskGroup(req, res) {
    const id = req.params.id;
    const taskGroup = await db.query(`SELECT * FROM task_group WHERE id = ${id}`);
    res.json(taskGroup.rows[0]);
  }

  async updateTaskGroup(req, res) {
    const id = req.params.id;
    const { name, user_id } = req.body;
    const updatedTaskGroup = await db.query(`UPDATE task_group set name = $1, user_id = $2 WHERE id = $3`, [name, user_id, id]);
    res.json('taskGroup Updated');
  }

  async deleteTaskGroup(req, res) {
    const id  = req.params.id;
    const deletedTaskGroup = await db.query(`DELETE FROM task_group WHERE id = $1`, [id]);
    res.json('taskGroup Deleted');
  }
}

module.exports = new TaskGroupController();