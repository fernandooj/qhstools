 'use strict';
 
let moment   = require('moment');
let express = require('express')
let router = express.Router()
let procesoService = require('./../services/procesoService.js')  

 


router.get('/', (req,res)=>{
	procesoService.getAll((err, proceso)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			res.json({status:'SUCCESS', proceso, total:proceso.length, code:1})  
		}
	})
})

router.get('/activo', (req,res)=>{
	procesoService.getActivo((err, proceso)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', proceso, total:proceso.length, code:1})  
		}
	})
})

router.get('/porProceso/:id', (req,res)=>{
	procesoService.getPorProceso(req.params.id, (err, proceso)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', proceso, total:proceso.length, code:1})  
		}
	})
})

router.get('/porEmpresa/:id', (req,res)=>{
	procesoService.porEmpresa(req.params.id, (err, proceso)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', proceso, total:proceso.length, code:1})  
		}
	})
})


router.get('/porUsuario/:id', (req, res)=>{
	let id = req.params.id=='logeado' ?req.session.usuario._id : req.params.id
	console.log(id)
	procesoService.getPorUsuario(id, (err, proceso)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', proceso, total:proceso.length, code:1})  
		}
	})
})

 

router.post('/', (req,res)=>{
	procesoService.create(req.body, req.session.usuario._id, (err, proceso)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', proceso, total:proceso.length, code:1})  
		}
	})
})


module.exports = router