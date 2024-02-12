const {Sequelize} = require('sequelize')
const User = require('../models/user');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');

exports.addUser = (req, res, next)=>{
    const associate = req.body.associate;
    const associate_id = req.body.associate_id;
    const localsystemid = req.body.localsystemid;
    const email = req.body.email;
    const manager_id = req.body.manager_id;
    const manager_email = req.body.manager_email;
    const manager_name = req.body.manager_name;
    const ismanager = req.body.ismanager;
    const isAdmin = req.body.isAdmin;
    const direct_reports = req.body.direct_reports;
    const company = req.body.company;
    const OpCo = req.body.OpCo;
    const password = req.body.password;
    const hashedPassword = hashPassword(password.trim());
    
    User.create({
        associate:associate,
        associate_id:associate_id,
        password:hashedPassword,
        localsystemid:localsystemid,
        email:email,
        manager_id:manager_id,
        manager_email:manager_email,
        manager_name:manager_name,
        ismanager:ismanager,
        isAdmin:isAdmin,
        direct_reports:direct_reports,
        company:company,
        OpCo:OpCo
    }).then(result=>{
        console.log("User has been created successfully!");
        res.status(200).send({
            status:"success",
            data:{
                result:result
            }
        });
    }       
    ).catch(err=>{
        console.log(err);
    });
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
    const userid = req.body.associate_id;
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
    const associate = req.body.associate;
    const associate_id = req.body.associate_id;
    const localsystemid = req.body.localsystemid;
    const email = req.body.email;
    const manager_id = req.body.manager_id;
    const manager_email = req.body.manager_email;
    const manager_name = req.body.manager_name;
    const ismanager = req.body.ismanager;
    const isAdmin = req.body.isAdmin;
    const direct_reports = req.body.direct_reports;
    const company = req.body.company;
    const OpCo = req.body.OpCo;
    const password = req.body.pasword;
    User.findByPk(associate_id).then(user=>
       {
        user.associate = associate;
        user.associate_id = associate_id;
        user.localsystemid = localsystemid;
        user.email = email;
        user.manager_id = manager_id;
        user.manager_email = manager_email;
        user.manager_name = manager_name;
        user.ismanager = ismanager;
        user.isAdmin = isAdmin;
        user.direct_reports = direct_reports;
        user.company = company;
        user.OpCo = OpCo;
        user.password = password;
        return user.save()
       }
    ).then(result=>{
        res.status(200).send({
            status:"success",
            data:{
                result:result
            }
        })
    }).catch(err=>console.log(err))
}

exports.deleteUser = (req,res,next)=>{
    const userid = req.body.associate_id;
    User.findByPk(userid).then(user=>{
       return user.destroy();
    }).then(result=>{
        console.log("Deleted the user!");
        res.status(200).send({
            status:"success",
            data:{
                result:result
            }
        })
    }).catch(err=>{
        console.log(err);
    })
}

