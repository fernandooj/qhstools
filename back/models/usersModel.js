'use strict';

/////////////////////////////////////////////////////////////////////////
/***** importo mongoose para el modelado de la base de datos  **********/
/***** importo bcrypt  para la encriptacion de la contraseña  **********/
/////////////////////////////////////////////////////////////////////////
let mongoose = require('mongoose');
let Schema = mongoose.Schema
let bcrypt   = require('bcrypt-nodejs');
let moment   = require('moment');

/////////////////////////////////////////////////////////////////////////
/********** genero la base la coleccion llamada users   ****************/
/////////////////////////////////////////////////////////////////////////
let UserSchema = Schema({
	createdAt	: { type: String, default: moment().format('YYYY-MM-DD h:mm:ss') },
	updatedAt	: String,
	username	: String,
	tokenPhone	: String, //// token de las notificaciones que van al celular
	nombre		: String,
	nacimiento  : String,
	sexo 		: String,
	pais		: String,
	ciudad		: String,
	avatar	 	: String,  /// url de la imagen
	email		: String,
	telefono	: String,
	tipo		: String,  /// email | facebook | google | celular
	acceso		: String,  /// niveles de acceso a la aplicacion ver ayua abajo
	estado		: Boolean, /// activo == true / innactivo == false
	updatedAt	: String,
	username	: String,
	password 	: String,
	token		: String,
	idEmpresa   :[{type: Schema.Types.ObjectId, ref:'Empresa'}], /// ids de las empresas asignadas
});

 
/////////////////////////////////////////////////////////////////////////
/********** genero el flash para encriptar la contraseña  **************/
/////////////////////////////////////////////////////////////////////////
UserSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


module.exports =  mongoose.model('User', UserSchema) 


 /* NIVELES DE ACCESO
  -- Superadmin ==> acceso a toda la aplicacion
  --
 */