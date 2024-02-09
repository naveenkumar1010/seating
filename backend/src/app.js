const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const authRoute = require('./routes/auth.route');

const adminRoute = require('./routes/admin.route')

const { httpLogStream } = require('./utils/logger');

//Database
const sequelize = require ('./utils/database')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(morgan('combined', { stream: httpLogStream }));
const corsOptions = { 
    // origin:'https://abc.onrender.com',
    AccessControlAllowOrigin: '*',  
    origin: '*',  
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
  }
app.use(cors(corsOptions));

app.disable('x-powered-by');

// Middleware to set Access-Control-Allow-Methods header
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    next();
});
app.use('/admin',adminRoute)
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
    res.status(200).send({
        status: "success",
        data: {
            message: "API working fine"
        }
    });
});

app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).send({
        status: "error",
        message: err.message
    });
    next();
});
sequelize.sync().then(result=>{
    console.log(result);
}).catch(err=>{
    console.log(err);
})

module.exports = app;