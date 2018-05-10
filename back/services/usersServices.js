'use strict';

let User = require('./../models/usersModel.js');
let moment   = require('moment');

class userServices {

	/////////////////////////////////////////////////////////////////////////
	///// 		listo todos los usuarios, sin condicion, 
	/////////////////////////////////////////////////////////////////////////
	get(callback){
		User.find({}, null, {sort: {_id: -1}}, callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera solo un usuario por el username
	/////////////////////////////////////////////////////////////////////////
	getEmail(user, callback){
		User.findOne({'username':user.username}, callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		cuando el usuario hace login
	/////////////////////////////////////////////////////////////////////////
	login(user, callback){
		User.findOne({ 'username' :  user.username }, callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupero los usuarios activos 
	/////////////////////////////////////////////////////////////////////////
	getActivos(callback){
		User.find({ 'estado' : true }, callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupero los usuarios tipo suscriptor 
	/////////////////////////////////////////////////////////////////////////
	getSuscriptores(callback){
		User.find({ 'estado' :  'activo', 'acceso':'suscriptor' }, callback)
	}

	createUser(user, token, avatar, callback){
		let newUsuario = new User() 
		newUsuario.username  = user.username
		newUsuario.email 	 = user.email
		newUsuario.estado    = false
		newUsuario.tipo	     = user.tipo
		newUsuario.acceso    = user.acceso
		newUsuario.token     = token
		newUsuario.empresas  = []
		newUsuario.save(callback);
	}
 
	/////////////////////////////////////////////////////////////////////////
	///// 		edito el token, idUser==>id usuario  |  code==>token 
	/////////////////////////////////////////////////////////////////////////
	modificaCodigo(_id, code, callback){
			User.findByIdAndUpdate(_id, {$set:{
				'token':code
			}}, callback );	
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		verifica que el usuario y el token sean iguales
	/////////////////////////////////////////////////////////////////////////
	verificaToken(data, callback){
		User.findOne({'username':data.username, 'token': data.token}, callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		activa / desactiva el usuario
	/////////////////////////////////////////////////////////////////////////
	activaDesactiva(_id, data, callback){
		User.findByIdAndUpdate(_id, {$set: {
		    'estado': 	  data,
		    'updatedAt':  moment().format('YYYY-MM-DD h:mm:ss')
		}}, callback);
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		edito el usuario
	/////////////////////////////////////////////////////////////////////////
	edit(user, _id, callback){
		let newUsuario = new User(); 
		if (user.password) {
			User.findByIdAndUpdate(_id, {$set: {
	            'nombre':         user.nombre,
	            'nacimiento': 	  user.nacimiento,
	            'password': 	  newUsuario.generateHash(user.password),
	            'sexo':       	  user.sexo,
	            'pais':  	  	  user.pais,
	            'ciudad':     	  user.ciudad,
	            'updatedAt':      moment().format('YYYY-MM-DD h:mm:ss')
        	}}, callback);
		}else{
			User.findByIdAndUpdate(id._id, {$set: {
	            'nombre':         user.nombre,
	            'nacimiento': 	  user.nacimiento,
	            'sexo':       	  user.sexo,
	            'pais':       	  user.pais,
	            'ciudad':     	  user.ciudad,
	            'updatedAt':      moment().format('YYYY-MM-DD h:mm:ss')
        	}}, callback);
		}
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		modifico el avatar 
	/////////////////////////////////////////////////////////////////////////	
	avatar(_id, avatar, callback){
		User.findByIdAndUpdate(_id, {$set: {
            avatar    : avatar,
            'updatedAt'   : moment().format('YYYY-MM-DD h:mm:ss')
        }}, callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		edito el array de las empresas
	/////////////////////////////////////////////////////////////////////////
	editEmpresas(id, idEmpresa, callback){
		User.findByIdAndUpdate(id, {$set: {
		    'idEmpresa': idEmpresa,
		    'updatedAt':  moment().format('YYYY-MM-DD h:mm:ss')
		}}, callback);
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		modifico token del celular
	/////////////////////////////////////////////////////////////////////////	
	modificaTokenPhone(idUser, tokenPhone, callback){
		User.findByIdAndUpdate(idUser, {$set:{
			'tokenPhone':tokenPhone,
		}}, callback );	
	}



}

module.exports = new userServices()