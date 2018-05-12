 

let empresaSchema = require('./../models/empresaModel.js');



class empresaServices{
	/////////////////////////////////////////////////////////////////////////
	///// 		listo todos los usuarios, sin condicion, 
	/////////////////////////////////////////////////////////////////////////
	getAll(callback){
		empresaSchema.find({}, null, {sort: {_id: -1}}, callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera solo un usuario por el username
	/////////////////////////////////////////////////////////////////////////
	getActivo(callback){
		empresaSchema.find({'estado':true}).populate('idProceso').exec(callback)
	}


	/////////////////////////////////////////////////////////////////////////
	///// 		recupera todos los asignados a un usuario
	/////////////////////////////////////////////////////////////////////////
	getPorUsuario(idUsuario, callback){
		empresaSchema.find({'idUsuarioCrea':idUsuario}).populate('idProceso').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera solo una empresa
	/////////////////////////////////////////////////////////////////////////
	getPorEmpresa(_id, callback){
		console.log(_id)
		empresaSchema.findById({_id}).populate('idProceso').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera solo un usuario por el username
	/////////////////////////////////////////////////////////////////////////
	create(data, idUsuarioCrea, callback){
		let empresasSchema = new empresaSchema()
		empresasSchema.nombre    = data.nombre
		empresasSchema.area      = data.area
		empresasSchema.estado    = data.estado
		empresasSchema.idProceso = data.idProceso
		empresasSchema.idUsuarioCrea = idUsuarioCrea
		empresasSchema.save(callback)
	}
}



module.exports = new empresaServices()
