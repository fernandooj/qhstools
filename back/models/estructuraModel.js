'use strict';

/////////////////////////////////////////////////////////////////////////
//////  	importo mongoose para el modelado de la base de datos
/////////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
let Schema = mongoose.Schema
let moment   = require('moment');



/////////////////////////////////////////////////////////////////////////
///// 		genero la base la coleccion llamada estructura 
/////////////////////////////////////////////////////////////////////////
let estructuraSchema = Schema({
	createdAt      : { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
	nivel	       : String,
	denominacion   : String,
	estado	       : Boolean, /// activo == true | innactivo == false
	idEmpresa      : [{type: Schema.Types.ObjectId, ref:'Empresa'}],   
	idUsuarioCrea  : {type: Schema.Types.ObjectId, ref:'User'},        
});

 
module.exports =  mongoose.model('Estructura', estructuraSchema) 

 
