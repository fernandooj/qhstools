 

let indicadorSchema = require('./../models/indicadorModel.js');



class indicadorService{
	/////////////////////////////////////////////////////////////////////////
	///// 		listo todos los indicadores, sin condicion, 
	/////////////////////////////////////////////////////////////////////////
	getAll(callback){
		indicadorSchema.find({}, null, {sort: {_id: -1}}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera solo un usuario por el username
	/////////////////////////////////////////////////////////////////////////
	getActivo(callback){
		indicadorSchema.find({'estado':true}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}
	/////////////////////////////////////////////////////////////////////////
	///// 		recupera todos los asignados a un usuario
	/////////////////////////////////////////////////////////////////////////
	getPorUsuario(idUsuario, callback){
		indicadorSchema.find({'idUsuarioCrea':idUsuario}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera solo una estructura por su id
	/////////////////////////////////////////////////////////////////////////
	getPorindicadorSchema(_id, callback){
		indicadorSchema.findById({_id}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		recupera por empresa
	/////////////////////////////////////////////////////////////////////////
	porEmpresa(idEmpresa, callback){
		indicadorSchema.find({'idEmpresa':idEmpresa}).populate('idEmpresa', 'nombre area').populate('idUsuarioCrea', 'nombre username email').exec(callback)
	}

	/////////////////////////////////////////////////////////////////////////
	///// 		guardo
	/////////////////////////////////////////////////////////////////////////
	create(data, idUsuarioCrea, callback){
		console.log(data.idEstructura)
		let pSchema           = new indicadorSchema()
		pSchema.nombre        = data.nombre
		pSchema.descripcion   = data.descripcion
		pSchema.periodicidad  = data.periodicidad
		pSchema.unidad        = data.unidad
		pSchema.meta          = data.meta
		pSchema.tendencia     = data.tendencia
		pSchema.suma          = data.suma
		pSchema.rangos        = data.rangos
		pSchema.data          = data.data
		pSchema.estado        = data.estado
		pSchema.idEstructura  = data.idEstructura
		pSchema.idEmpresa     = data.idEmpresa
		pSchema.idProceso     = data.idProceso
		pSchema.idUsuarioCrea = idUsuarioCrea
		pSchema.save(callback)
	}
}

module.exports = new indicadorService()
