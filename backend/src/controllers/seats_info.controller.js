const {Sequelize} = require('sequelize')
const seats_info = require('../models/seats_info');

exports.add_seat=(req,res,next)=>{

    // for(let i=1;i<=160;i++){
    //     var seat_no=i.toString();
    //     let size=seat_no.length;
    //     for(let j=size;j<3;j++){
    //         seat_no='0'+seat_no;
    //     }
    //     let seat_name="WKS"+seat_no;
    //     const data={
    //         seat_number:seat_name,
    //         status:true,
    //         created_by:"varsan",
    //         updated_by:"varsan"
    //     }
    // seats_info.create(data)
    // .then((data)=>{
    //     res.status(200).json({
    //         status:"success",
    //         data:data
    //     })
    // }).catch((err)=>{
    //     res.status(400).json({
    //         status:"failure",
    //         error:err.message
    //     })
    // })
        

    const data={
        seat_number:req.body.seat_number,
        status:req.body.status,
        created_by:req.body.created_by,
        updated_by:req.body.updated_by
    }

    seats_info.create(data)
    .then((data)=>{
        res.status(200).json({
            status:"success",
            data:data
        })
    }).catch((err)=>{
        res.status(400).json({
            status:"failure",
            error:err
        })
    })

}


exports.edit_seat=(req,res,next)=>{
    let data =req.body.email;
}