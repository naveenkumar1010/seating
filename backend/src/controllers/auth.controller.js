const User = require('../models/user');
const { hash: hashPassword, compare: comparePassword } = require('../utils/password');
const { generate: generateToken, decode: decodeToken } = require('../utils/token');

exports.signup = (req, res) => {
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
    .catch((err)=>{
        return res.status(400).json({
            status:"failure",
            error:err
        })
    })
};

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email.trim(), (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    status: 'error',
                    message: `User with email ${email} was not found`
                });
                return;
            }
            res.status(500).send({
                status: 'error',
                message: err.message
            });
            return;
        }
        if (data) {
            if (comparePassword(password.trim(), data.password)) {
                const token = generateToken(data.id,data.email);
                let temp = decodeToken(token);
                let flag = false;
                if(temp.email==="mani@esko.com"){
                        flag=true
                }
                res.status(200).send({
                    status: 'success',
                    data: {
                        token,
                        firstname: data.firstname,
                        lastname: data.lastname,
                        email: data.email,
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
    });

}