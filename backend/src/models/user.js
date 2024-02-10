// const db = require('../config/db.config');
// const { createNewUser: createNewUserQuery, findUserByEmail: findUserByEmailQuery } = require('../database/queries');
// const { logger } = require('../utils/logger');

// class User {
//     constructor(firstname, lastname, email, password) {
//         this.firstname = firstname;
//         this.lastname = lastname;
//         this.email = email;
//         this.password = password;
//     }

//     static create(newUser, cb) {
//         db.query(createNewUserQuery, 
//             [
//                 newUser.firstname, 
//                 newUser.lastname, 
//                 newUser.email, 
//                 newUser.password
//             ], (err, res) => {
//                 if (err) {
//                     logger.error(err.message);
//                     cb(err, null);
//                     return;
//                 }
//                 cb(null, {
//                     id: res.insertId,
//                     firstname: newUser.firstname,
//                     lastname: newUser.lastname,
//                     email: newUser.email
//                 });
//         });
//     }

//     static findByEmail(email, cb) {
//         db.query(findUserByEmailQuery, email, (err, res) => {
//             if (err) {
//                 logger.error(err.message);
//                 cb(err, null);
//                 return;
//             }
//             if (res.length) {
//                 cb(null, res[0]);
//                 return;
//             }
//             cb({ kind: "not_found" }, null);
//         })
//     }
// }

// module.exports = User;

const Sequelize = require('sequelize')
const sequelize = require ('../utils/database')
const User = sequelize.define('user',{
    associate_id:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey:true
    },
    associate: Sequelize.STRING,
    localsystemid: Sequelize.STRING,
    email:Sequelize.STRING,
    manager_id:Sequelize.STRING,
    manager_name:Sequelize.STRING,
    manager_email:Sequelize.STRING,
    ismanager:Sequelize.BOOLEAN,
    isAdmin:Sequelize.BOOLEAN,
    direct_reports:Sequelize.INTEGER,
    company:Sequelize.STRING,
    OpCo:Sequelize.STRING

});

module.exports = User