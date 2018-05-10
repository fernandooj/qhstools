 

let proceso = require('./../models/procesoModel.js');



class procesoService{
	/////////////////////////////////////////////////////////////////////////
	///// 		listo todos los usuarios, sin condicion, 
	/////////////////////////////////////////////////////////////////////////
	getAll(callback){
		proceso.find({}, null, {sort: {_id: -1}}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera solo un usuario por el username
	/////////////////////////////////////////////////////////////////////////
	getActivo(callback){
		proceso.find({'estado':true}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}
	/////////////////////////////////////////////////////////////////////////
	///// 		recupera todos los asignados a un usuario
	/////////////////////////////////////////////////////////////////////////
	getPorUsuario(idUsuario, callback){
		proceso.find({'idUsuarioCrea':idUsuario}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera solo una estructura por su id
	/////////////////////////////////////////////////////////////////////////
	getPorProceso(_id, callback){
		proceso.findById({_id}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera por empresa
	/////////////////////////////////////////////////////////////////////////
	porEmpresa(idEmpresa, callback){
		proceso.find({'idEmpresa':idEmpresa}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		guardo
	/////////////////////////////////////////////////////////////////////////
	create(data, idUsuarioCrea, callback){
		let pSchema           = new proceso()
		pSchema.nombre        = data.nombre
		pSchema.tipo          = data.tipo
		pSchema.alcance       = data.alcance
		pSchema.recursos      = data.recursos
		pSchema.lider         = data.lider
		pSchema.estado        = data.estado
		pSchema.idEstructura  = data.idEstructura
		pSchema.idEmpresa     = data.idEmpresa
		pSchema.idUsuarioCrea = idUsuarioCrea
		pSchema.save(callback)
	}
}

module.exports = new procesoService()
