 'use strict';
 
let moment   = require('moment');
let express = require('express')
let router = express.Router()

let fs = require('fs');
let path = require('path');

let randonNumber=null;  /// numero randon que genera el codigo de verificacion, linea 35
let empresaService = require('./../services/empresaService.js')  

 


router.get('/', (req,res)=>{
	empresaService.getAll((err, empresa)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			res.json({status:'SUCCESS', empresa, total:empresa.length, code:1})  
		}
	})
})

router.get('/activo', (req,res)=>{
	empresaService.getActivo((err, empresa)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', empresa, total:empresa.length, code:1})  
		}
	})
})

router.get('/porEmpresa/:id', (req,res)=>{
	empresaService.getPorEmpresa(req.params.id, (err, empresa)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			empresa =empresa===null ?[] :empresa
			res.json({status:'SUCCESS', empresa, total:empresa, code:1})  
		}
	})
})

router.get('/porUsuario/:id', (req, res)=>{
	let id = req.params.id=='logeado' ?req.session.usuario._id : req.params.id
	console.log(id)
	empresaService.getPorUsuario(id, (err, empresa)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', empresa, total:empresa.length, code:1})  
		}
	})
})

 

router.post('/', (req,res)=>{
	empresaService.create(req.body, req.session.usuario._id, (err, empresa)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', empresa, total:empresa.length, code:1})  
		}
	})
})


module.exports = router