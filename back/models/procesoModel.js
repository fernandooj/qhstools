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
let UserSchema = mongoose.Schema({
	createdAt	: { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
	editedAt	: { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
	nombre	 : String,
    tipo     : String, 										   /// estratégico, misional, apoyo							   
	alcance	 : String,          							    								  
	recursos : String,          							   /// humanos, físicos, información documentada asociada	          							    
	lider    :[{type: Schema.Types.ObjectId, ref:'User'}],     /// ids de las empresas asignadas
	objetivo : String,		
	userEdit :[{type: Schema.Types.ObjectId, ref:'User'}],      
});

 
 

module.exports =  mongoose.model('User', UserSchema) 

 


