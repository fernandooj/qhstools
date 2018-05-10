 'use strict';
 
let moment   = require('moment');
let express = require('express')
let router = express.Router()
 
let estructuraService = require('./../services/estructuraService.js')  

 


router.get('/', (req,res)=>{
	estructuraService.getAll((err, estructura)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			res.json({status:'SUCCESS', estructura, total:estructura.length, code:1})  
		}
	})
})

router.get('/activo', (req,res)=>{
	estructuraService.getActivo((err, estructura)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', estructura, total:estructura.length, code:1})  
		}
	})
})

router.get('/porEstructura/:id', (req,res)=>{
	estructuraService.getPorEstructura(req.params.id, (err, estructura)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', estructura, total:estructura.length, code:1})  
		}
	})
})

router.get('/porEmpresa/:id', (req,res)=>{
	estructuraService.porEmpresa(req.params.id, (err, estructura)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', estructura, total:estructura.length, code:1})  
		}
	})
})


router.get('/porUsuario/:id', (req, res)=>{
	let id = req.params.id=='logeado' ?req.session.usuario._id : req.params.id
	console.log(id)
	estructuraService.getPorUsuario(id, (err, estructura)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', estructura, total:estructura.length, code:1})  
		}
	})
})

 

router.post('/', (req,res)=>{
	estructuraService.create(req.body, req.session.usuario._id, (err, estructura)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', estructura, total:estructura.length, code:1})  
		}
	})
})


module.exports = router