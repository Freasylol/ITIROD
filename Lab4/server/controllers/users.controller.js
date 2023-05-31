const db = require('../db');
// const axios = require('axios');
// const fetch = require("node-fetch");
// const fetch = require("node-fetch");
const nodemailer = require('nodemailer');

// var myHeaders = new fetch.Headers();

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

  // async sendEmail(req, res) {
  //   let transporter = nodemailer.createTransport({
  //     service: 'gmail',
  //     auth: {
  //       user: 'obereg2005.2002@gmail.com',
  //       pass: '1a23456789A'
  //     }
  //   });

  //   let mailOptions = {
  //     from: 'obereg2005.2002@gmail.com',
  //     to: 'romalepeshko42@gmail.com',
  //     subject: 'Test email',
  //     text: 'This is email text'
  //   }

  //   transporter.sendMail(mailOptions, function(error, info) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log('Email sent: ' + info.response);
  //     }
  //   });

  //   res.send('Email sent');

    // let email = "obereg2005.2002@gmail.com";
    // let name = "name";
    // let subject = "Forgotten Password";
    // let message = "You forget you password";
    // const myHeaders = new fetch.Headers();
    // myHeaders.append("Content-Type", "application/json");
    // myHeaders.set('Authorization', 'Basic ' + btoa('<API Key>'+":" +'<Secret Key>'));
    // const data = JSON.stringify({
    //   "Messages": [{
    //     "From": {"Email": "<YOUR EMAIL>", "Name": "<YOUR NAME>"},
    //     "To": [{"Email": email, "Name": name}],
    //     "Subject": subject,
    //     "TextPart": message
    //   }]
    // });
    // const requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: data,
    // };
    // fetch("https://api.mailjet.com/v3.1/send", requestOptions)
    //   .then(response => response.text())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    
    
  // }
}

module.exports = new UsersController();