'use strict';

/////////////////////////////////////////////////////////////////////////
//////  	importo mongoose para el modelado de la base de datos
/////////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
let Schema = mongoose.Schema
let moment   = require('moment');



/////////////////////////////////////////////////////////////////////////
///// 		genero la base la coleccion llamada EMPRESA 
/////////////////////////////////////////////////////////////////////////
let empresaSchema = Schema({
	createdAt : { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
	nombre	  : String,
	area	  : String,
	estado	  : Boolean, /// activo == true | innactivo == false
	idProceso : [{type: Schema.Types.ObjectId, ref:'Proceso'}],  /// ids de las empresas asignadas
	idUsuarioCrea : {type: Schema.Types.ObjectId, ref:'User'},  /// ids de las empresas asignadas
});

 
 


module.exports =  mongoose.model('Empresa', empresaSchema) 