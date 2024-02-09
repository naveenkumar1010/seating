const {Sequelize} = require('sequelize')
const User = require('../models/user');

exports.addUser = (req, res, next)=>{
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const id = req.body.id;
    User.create({firstname:firstname,lastname:lastname,email:email,password:password,id:id});
}

exports.getUsers = (req, res, next)=>{
    User.findAll().then(users=>{
        res.status(200).send({
            status: "success",
            data: {
                users:users
            }
        });
    })
}
exports.getUser = (req, res, next)=>{
    const userid = req.body.id;
    User.findByPk(userid).then(user=>
        res.status(200).send({
            status:"success",
            data:{
                user:user
            }
        })
    )
}

exports.editUser = (req, res, next)=>{
    const userid = req.body.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    User.findByPk(userid).then(user=>
       {
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;
        return user.save()
       }
    ).then(result=>{
        console.log("Updated the user!");
    }).catch(err=>console.log(err))
}

exports.deleteUser = (req,res,next)=>{
    const userid = req.body.id;
    User.findByPk(userid).then(user=>{
       return user.destroy();
    }).then(result=>{
        console.log("Deleted the user!");
    }).catch(err=>{
        console.log(err);
    })
}

