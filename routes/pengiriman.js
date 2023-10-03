const express = require('express');
const router = express.Router();

const connection = require('../config/db.js');
const { body, validationResult } = require('express-validator');

router.get('/', function (req,res ){
    connection.query('select * from pengiriman order by id_pengiriman desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'data pengiriman',
                data: rows
            })
        }
    })
});

router.post('/store',[
    body('id_pesanan').notEmpty(),
    body('metode_pengiriman').notEmpty(),
    body('biaya_pengiriman').notEmpty(),
    body('tanggal_pengiriman').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(442).json({
            error: error.array()
        });
    }
    let Data = {
        id_pesanan: req.body.id_pesanan,
        metode_pengiriman: req.body.metode_pengiriman,
        biaya_pengiriman: req.body.biaya_pengiriman,
        tanggal_pengiriman: req.body.tanggal_pengiriman
    }
    connection.query('insert into pengiriman set ?', Data, function(err, rows){
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
    connection.query(`select * from pengiriman where id_pengiriman = ${id}`, function (err, rows) {
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
                message: 'Data pengiriman',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id',[
    body('id_pesanan').notEmpty(),
    body('metode_pengiriman').notEmpty(),
    body('biaya_pengiriman').notEmpty(),
    body('tanggal_pengiriman').notEmpty()
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
        metode_pengiriman: req.body.metode_pengiriman,
        biaya_pengiriman: req.body.biaya_pengiriman,
        tanggal_pengiriman: req.body.tanggal_pengiriman
    }   
    connection.query(`update pengiriman set ? where id_pengiriman = ${id}`, Data, function (err, rows){
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
    connection.query(`delete from pengiriman where id_pengiriman = ${id}`, function (err, rows){
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