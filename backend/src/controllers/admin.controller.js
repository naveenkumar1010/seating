const {Sequelize} = require('sequelize')
const User = require('../models/user');

exports.addUser = async(req, res, next)=>{
    var data={
        "id":req.body.id,
        "firstname":req.body.firstname,
        "lastname":req.body.lastname,
        "email":req.body.email,
        "password":req.body.password
    }
    User.create(data).then(data=>{
        res.status(200).json({
            status:"success",
            message:"User added",
            data:data
        })
    })
    .catch(err=>{
        return res.status(400).json({
            status:"failure",
            error:err
        })
    })
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
exports.getUser = async(req, res, next)=>{
    try {
        var getid=req.params.id;
        const data =await User.findOne({
            where:{
                id:getid
            }
        })
        if(data){
            return res.status(200).json({
            status:"success",
            data:data
            })
        }
        else{
            return res.status(200).json({
                status:"success",
                data:`There is no Employee with id ${getid}`
                })
        }
    } catch (err) {
        return res.status(400).json({
            status:"failure",
            error:err
        })
    }
    
}

exports.editUser = (req, res, next)=>{
    const userid = req.params.id;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    User.findByPk(userid).then(user=>
       {
        user.firstname = firstname;
        user.lastname = lastname;
        user.password = password;
        user.save()
        console.log("Updated the user!");
        return res.status(200).json({
            status:"success",
            message:"User updated successfully",
            data:user
        })
       }
    )
    .catch(err=>{
        return res.status(400).json({
            status:"failure",
            error:err
        })
    })
}

exports.deleteUser = (req,res,next)=>{
    const userid = req.body.id;
    User.findByPk(userid).then(user=>{
       user.destroy();
       console.log(user);
       console.log("Deleted the user!");
       return res.status(200).json({
        status:"success",
        message:"User deleted successfully",
        data:user
    })
    })
    .catch(err=>{
        return res.status(400).json({
            status:"failure",
            error:err
        })
    })
}

