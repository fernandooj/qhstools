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
let indicadorSchema = Schema({
	createdAt     : { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
	nombre	      : String,
	descripcion   : String,
	periodicidad  : String,
	unidad        : String,
	meta          : Number,
	tendencia     : String,
	suma          : Boolean,    /// true ==> suma total  | false ==> promedio
	rangos        : [],
	data          : [],
	estado	      : Boolean,    /// activo == true | innactivo == false
	idEstructura  :  {type: Schema.Types.ObjectId, ref:'Estructura'},	
	idEmpresa     : [{type: Schema.Types.ObjectId, ref:'Empresa'}],  
	idProceso     : [{type: Schema.Types.ObjectId, ref:'Proceso'}],  /// ids de las empresas asignadas
	idUsuarioCrea :  {type: Schema.Types.ObjectId, ref:'User'},  /// ids de las empresas asignadas
});

module.exports =  mongoose.model('Indicador', indicadorSchema) 