const db = require('../db');

class UsersController {
  async createUser(req, res) {
    const {username, password, email} = req.body;
    const newUser = await db.query(`INSERT INTO users(username, password, email) VALUES($1, $2, $3);`, [username, password, email]);
    res.json('user Created');
  } 

  async getUsers(req, res) {
    const users = await db.query(`SELECT * FROM users;`);
    res.json(users.rows);
  }

  async getOneUser(req, res) {
    const id = req.params.id;
    const user = await db.query(`SELECT * FROM users WHERE id = ${id}`);
    res.json(user.rows[0]);
  }

  async updateUser(req, res) {
    const id = req.params.id;
    const {username, password, email} = req.body;
    const updatedUser = await db.query(`UPDATE users set username = $1, password = $2, email = $3 WHERE id = $4`, [username, password, email, id]);
    res.json('user Updated');
  }

  async deleteUser(req, res) {
    const id  = req.params.id;
    const deletedUser = await db.query(`DELETE FROM users WHERE id = $1`, [id]);
    res.json('user Deleted');
  }
}

module.exports = new UsersController();