 

let estructuraSchema = require('./../models/estructuraModel.js');



class empresaServices{
	/////////////////////////////////////////////////////////////////////////
	///// 		listo todos los usuarios, sin condicion, 
	/////////////////////////////////////////////////////////////////////////
	getAll(callback){
		estructuraSchema.find({}, null, {sort: {_id: -1}}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera solo un usuario por el username
	/////////////////////////////////////////////////////////////////////////
	getActivo(callback){
		estructuraSchema.find({'estado':true}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}


	/////////////////////////////////////////////////////////////////////////
	///// 		recupera todos los asignados a un usuario
	/////////////////////////////////////////////////////////////////////////
	getPorUsuario(idUsuario, callback){
		estructuraSchema.find({'idUsuarioCrea':idUsuario}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera solo una estructura por su id
	/////////////////////////////////////////////////////////////////////////
	getPorEstructura(_id, callback){
		estructuraSchema.findById({_id}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera por empresa
	/////////////////////////////////////////////////////////////////////////
	porEmpresa(idEmpresa, callback){
		estructuraSchema.find({'idEmpresa':idEmpresa}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		guardo
	/////////////////////////////////////////////////////////////////////////
	create(data, idUsuarioCrea, callback){
		let estructurasSchema           = new estructuraSchema()
		estructurasSchema.nivel         = data.nivel
		estructurasSchema.denominacion  = data.denominacion
		estructurasSchema.estado        = data.estado
		estructurasSchema.idEmpresa     = data.idEmpresa
		estructurasSchema.idUsuarioCrea = idUsuarioCrea
		estructurasSchema.save(callback)
	}
}

module.exports = new empresaServices()
