 'use strict';
 
let moment   = require('moment');
let express = require('express')
let router = express.Router()
let indicador = require('./../services/indicadorService.js')  

 


router.get('/', (req,res)=>{
	indicador.getAll((err, indicador)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			res.json({status:'SUCCESS', indicador, total:indicador.length, code:1})  
		}
	})
})

router.get('/activo', (req,res)=>{
	indicador.getActivo((err, indicador)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', indicador, total:indicador.length, code:1})  
		}
	})
})

router.get('/porIndicador/:id', (req,res)=>{
	indicador.getPorIndicador(req.params.id, (err, indicador)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', indicador, total:indicador.length, code:1})  
		}
	})
})

router.get('/porEmpresa/:id', (req,res)=>{
	indicador.porEmpresa(req.params.id, (err, indicador)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', indicador, total:indicador.length, code:1})  
		}
	})
})


router.get('/porUsuario/:id', (req, res)=>{
	let id = req.params.id=='logeado' ?req.session.usuario._id : req.params.id
	console.log(id)
	indicador.getPorUsuario(id, (err, indicador)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', indicador, total:indicador.length, code:1})  
		}
	})
})

 

router.post('/', (req,res)=>{
	indicador.create(req.body, req.session.usuario._id, (err, indicador)=>{
		if (err) {
			res.json({status:'FAIL', err, code:0})
		}else{
			 res.json({status:'SUCCESS', indicador, total:indicador.length, code:1})  
		}
	})
})


module.exports = router