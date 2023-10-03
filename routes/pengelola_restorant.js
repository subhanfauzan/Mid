const express = require('express');
const router = express.Router();

const connection = require('../config/db.js');
const { body, validationResult } = require('express-validator');

router.get('/', function (req,res ){
    connection.query('select * from pengelola_restoran order by id_pengelola desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'data pengelola_restoran',
                data: rows
            })
        }
    })
});

router.post('/store',[
    body('nama_pengelola').notEmpty(),
    body('alamat').notEmpty(),
    body('nomor_telepon').notEmpty(),
    body('email').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(442).json({
            error: error.array()
        });
    }
    let Data = {
        nama_pengelola: req.body.nama_pengelola,
        alamat: req.body.alamat,
        nomor_telepon: req.body.nomor_telepon,
        email: req.body.email
    }
    connection.query('insert into pengelola_restoran set ?', Data, function(err, rows){
        if(err){
            return res.status(500).json({
                staus: false,
                message: 'Server eror',
                error: err  
            })
        }else{
            return res.status(201).json({
                status: true,
                message: 'Sukses',
                data: rows[0]
            })
        }
    })
})

router.get('/(:id)', function(req,res) {
    let id = req.params.id;
    connection.query(`select * from pengelola_restoran where id_pengelola = ${id}`, function (err, rows) {
        if(err){
            return res.status(500).json({
                status: false,
                message: 'server eror',
            })
        }
        if(rows.length <=0){
            return res.status(404).json({
                staus: false,
                message: 'not Found',
            })
        }
        else{
            return res.status(200).json({
                status: true,
                message: 'Data pengelola_restoran',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id',[
    body('nama_pengelola').notEmpty(),
    body('alamat').notEmpty(),
    body('nomor_telepon').notEmpty(),
    body('email').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_pengelola: req.body.nama_pengelola,
        alamat: req.body.alamat,
        nomor_telepon: req.body.nomor_telepon,
        email: req.body.email
    }   
    connection.query(`update pengelola_restoran set ? where id_pengelola = ${id}`, Data, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server failed', 
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data Berhasil Diubah',
            })
        }
    })
})

router.delete('/delete/:id',function(req, res){
    let id = req.params.id;
    connection.query(`delete from pengelola_restoran where id_pengelola = ${id}`, function (err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server failed', 
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'Data Berhasil Dihapus',
            })
        }
    })
})

module.exports = router;