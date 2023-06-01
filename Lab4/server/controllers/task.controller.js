const db = require('../db');

class TaskController {
  async createTask(req, res) {
    const { name, priority, is_favorite, is_completed, task_group_id, user_id, creation_date, completion_date } = req.body;
    const newTask = await db.query(`INSERT INTO task(name, priority, is_favorite, is_completed, task_group_id, user_id, creation_date, completion_date) VALUES($1, $2, $3, $4, $5, $6, $7, $8);`, [name, priority, is_favorite, is_completed, task_group_id, user_id, creation_date, completion_date]);
    res.json('task Created');
  }

  async getTask(req, res) {
    const tasks = await db.query(`SELECT * FROM task`);
    res.json(tasks.rows);
  }

  async getOneTask(req, res) {
    const id = req.params.id;
    const task = await db.query(`SELECT * FROM task WHERE id = ${id}`);
    res.json(task.rows[0]);
  }

  async updateTask(req, res) {
    const id = req.params.id;
    const { name, user_id, priority, is_favorite, is_completed, task_group_id, creation_date, completion_date } = req.body;
    const updatedTask = await db.query(`UPDATE task set name = $1, priority = $2, is_favorite = $3, is_completed = $4, task_group_id = $5, user_id = $6, creation_date = $7, completion_date = $8 WHERE id = $9`, [name, priority, is_favorite, is_completed, task_group_id, user_id, creation_date, completion_date, id]);
    res.json('task Updated');
  }

  async deleteTask(req, res) {
    const id  = req.params.id;
    const deletedTask = await db.query(`DELETE FROM task WHERE id = $1`, [id]);
    res.json('task Deleted');
  }

  async getUserTasks(req, res) {
    const { user_id } = req.body;
    const tasks = await db.query(`SELECT * FROM task WHERE user_id = $1`, [user_id]);
    res.json(tasks.rows);
  }
}

module.exports = new TaskController();