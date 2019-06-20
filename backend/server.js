const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');
const Data = require('./data');

const API_PORT = 3001;
const app = express();
app.use(cors());
const router = express.Router();

//DB
const dbRoute = 'mongodb+srv://ingjuanorozco:juandavid1@juan-mdb-k7rqa.mongodb.net/test?retryWrites=true&w=majority';

let db = mongoose.connection;

db.once('open', () => console.log('Conectado a la base de datos'));
db.on('error',console.error.bind(console,'Error de conexión a MongoDB'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json);
app.use(logger('dev'));

//Metodo GET
router.get('/getData',(req,res) => {
    Data.find((err,data) => {
        if(err) return res.json({success :false, error:err});
        return res.json({success:true, data:data});
        });
});

//Metodo Update
router.get('/updateData',(req,res) => {
    const {id,update} = req.body;
    Data.findByIdAndUpdate(id,update, (err) => {
        if(err) return res.json({success :false, error:err});
        return res.json({success:true});
        });
});

//Metodo Delete
router.get('/deleteData',(req,res) => {
    const {id} = req.body;
    Data.findByIdAndRemove(id, (err) => {
        if(err) return res.json({success :false, error:err});
        return res.json({success:true});
        });
});

//Metodo Create
router.get('/putData',(req,res) => {
    let data = new Data();
    const {id,message} = req.body;
    if ((!id && id!== 0) || !message) {
        return res.json({
            success : false,
            error: 'Entradas Invalidas'
        });
    }
    data.message = message;
    data.id = id;
    data.save((err) => {
        if(err) return res.json({success :false, error:err});
        return res.json({success:true});
        });
});

app.use('/api',router);
app.listen(API_PORT, () => console.log(`Escuchando en el puerto ${API_PORT}`));