 'use strict';

/////////////////////////////////////////////////////////////////////////
////// 	  importo mongoose para el modelado de la base de datos  
/////////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
let Schema = mongoose.Schema
let bcrypt   = require('bcrypt-nodejs');
let moment   = require('moment');



///////////////////////////////////////////////////////////////////////////
/// genero la base la coleccion llamada PROCESO  
///////////////////////////////////////////////////////////////////////////
let ProcesoSchema = Schema({
	createdAt : { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
	nombre	  : String,
    tipo      : String,     /// estratégico, misional, apoyo							   
	alcance	  : String,          							    								  
	recursos  : String,		/// humanos | físicos | información documentada asocia
	lider     : String,  
	estado	  : Boolean,    /// activo == true | innactivo == false        							            							    
	idEstructura  :  {type: Schema.Types.ObjectId, ref:'Estructura'},	
	idEmpresa     : [{type: Schema.Types.ObjectId, ref:'Empresa'}],   
	idUsuarioCrea :  {type: Schema.Types.ObjectId, ref:'User'},      
});

module.exports =  mongoose.model('Proceso', ProcesoSchema) 

 


