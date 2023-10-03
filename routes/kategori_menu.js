const express = require('express');
const router = express.Router();

const connection = require('../config/db.js');
const { body, validationResult } = require('express-validator');

router.get('/', function (req,res ){
    connection.query('select * from kategori_menu order by id_kategori desc', function(err, rows){
        if(err){
            return res.status(500).json({
                status: false,
                message: 'Server failed',
            })
        }else{
            return res.status(200).json({
                status: true,
                message: 'data kategori_menu',
                data: rows
            })
        }
    })
});

router.post('/store',[
    body('nama_kategori').notEmpty()
],(req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(442).json({
            error: error.array()
        });
    }
    let Data = {
        nama_kategori: req.body.nama_kategori
    }
    connection.query('insert into kategori_menu set ?', Data, function(err, rows){
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
    connection.query(`select * from kategori_menu where id_kategori = ${id}`, function (err, rows) {
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
                message: 'Data kategori_menu',
                data: rows[0]
            })
        }
    })
})

router.patch('/update/:id',[
    body('nama_kategori').notEmpty()
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(422).json({
            error: error.array()
        });
    }
    let id = req.params.id;
    let Data = {
        nama_kategori: req.body.nama_kategori
    }   
    connection.query(`update kategori_menu set ? where id_kategori = ${id}`, Data, function (err, rows){
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
    connection.query(`delete from kategori_menu where id_kategori = ${id}`, function (err, rows){
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