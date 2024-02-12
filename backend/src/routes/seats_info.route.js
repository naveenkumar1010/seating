const express=require('express')
const router=express.Router();

const seats_info_controller = require('../controllers/seats_info.controller')


router.route('/add-seat').post(seats_info_controller.add_seat);




module.exports = router;