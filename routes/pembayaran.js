const express = require('express');
const router = express.Router();

const connection = require('../config/db.js');
const { body, validationResult } = require('express-validator');

router.get('/', function (req,res ){
    connection.query('select * from pembayaran order by id_pembayaran desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'data pembayaran',
                data: rows
            })
        }
    })
});

router.post('/store',[
    body('id_pesanan').notEmpty(),
    body('metode_pembayaran').notEmpty(),
    body('total_bayar').notEmpty(),
    body('tanggal_pembayaran').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(442).json({
            error: error.array()
        });
    }
    let Data = {
        id_pesanan: req.body.id_pesanan,
        metode_pembayaran: req.body.metode_pembayaran,
        total_bayar: req.body.total_bayar,
        tanggal_pembayaran: req.body.tanggal_pembayaran
    }
    connection.query('insert into pembayaran set ?', Data, function(err, rows){
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
    connection.query(`select * from pembayaran where id_pembayaran = ${id}`, function (err, rows) {
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
                message: 'Data pembayaran',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id',[
    body('id_pesanan').notEmpty(),
    body('metode_pembayaran').notEmpty(),
    body('total_bayar').notEmpty(),
    body('tanggal_pembayaran').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        id_pesanan: req.body.id_pesanan,
        metode_pembayaran: req.body.metode_pembayaran,
        total_bayar: req.body.total_bayar,
        tanggal_pembayaran: req.body.tanggal_pembayaran
    }   
    connection.query(`update pembayaran set ? where id_pembayaran = ${id}`, Data, function (err, rows){
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
    connection.query(`delete from pembayaran where id_pembayaran = ${id}`, function (err, rows){
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