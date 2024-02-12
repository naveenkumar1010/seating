const User = require('../models/user');
const {Sequelize} = require('sequelize');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken, decode: decodeToken } = require('../utils/token');

exports.signup = (req, res) => {
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
        const token = generateToken(data.id);
        res.status(200).send({
            status:"success",
            data:{
                token,
                result
            }
        });
    }       
    ).catch(err=>{
        console.log(err);
    });
    // const { firstname, lastname, email, password } = req.body;
    // const hashedPassword = hashPassword(password.trim());

    // const user = new User(firstname.trim(), lastname.trim(), email.trim(), hashedPassword);

    // User.create(user, (err, data) => {
    //     if (err) {
    //         res.status(500).send({
    //             status: "error",
    //             message: err.message
    //         });
    //     } else {
    //         const token = generateToken(data.id);
    //         res.status(201).send({
    //             status: "success",
    //             data: {
    //                 token,
    //                 data
    //             }
    //         });
    //     }
    // });
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail = async function(email) {
    return await this.findOne({ where: { email:email } });
  };
    User.findByEmail(email).then(user=>{
        if(user){
            if (comparePassword(password.trim(), user.dataValues.password)){
                const token = generateToken(user.dataValues.associate_id,user.dataValues.email);
                let temp = decodeToken(token);
                let flag = false;
                if(temp.email==="mani@esko.com"){
                        flag=true
                }
                res.status(200).send({
                    status: 'success',
                    data: {
                        user:user,
                        isAdmin: flag
                    }
                });
                return;
            }
            res.status(401).send({
                status: 'error',
                message: 'Incorrect password'
            });
        }
    }).catch(err=>console.log(err));
    // res.status(400).send({
    //     data:{
    //         user:gotUser
    //     }
    // })
    // User.findByEmail(email.trim(), (err, data) => {
    //     if (err) {
    //         if (err.kind === "not_found") {
    //             res.status(404).send({
    //                 status: 'error',
    //                 message: `User with email ${email} was not found`
    //             });
    //             return;
    //         }
    //         res.status(500).send({
    //             status: 'error',
    //             message: err.message
    //         });
    //         return;
    //     }
//         if (data) {
//             if (comparePassword(password.trim(), data.password)) {
//                 const token = generateToken(data.id,data.email);
//                 let temp = decodeToken(token);
//                 let flag = false;
//                 if(temp.email==="mani@esko.com"){
//                         flag=true
//                 }
//                 res.status(200).send({
//                     status: 'success',
//                     data: {
//                         token,
//                         firstname: data.firstname,
//                         lastname: data.lastname,
//                         email: data.email,
//                         isAdmin: flag
//                     }
//                 });
//                 return;
//             }
//             res.status(401).send({
//                 status: 'error',
//                 message: 'Incorrect password'
//             });
//         }
//     });

}