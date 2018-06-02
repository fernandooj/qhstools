import {connect}      from 'react-redux'
import React     from 'react'
import Proceso from './procesoComponent.js'
import {guardaProceso, obtieneProceso}      from '../../redux/actionCreator'
import store from '../../redux/store.js'
 
 
 
const procesoContain =(props)=>{
	console.log(props)
	return(
		<Proceso 
			valoresInput={(values)=>props.GuardarProceso(values, props.idEmpresaUrl)} 
			procesos={props.procesos} 
			respuesta={props.proceso}
			estructuras={props.estructuras}
		/>
	)
}

const mapStateToProps = (state) =>{
	return{
		proceso:state.proceso,
		estructuras:state.estructuras,
	}
}

 
const mapsDispatchToProps = (dispatch) =>{
	return {
		GuardarProceso(e, idEmpresaUrl) {
			e.nivel.forEach((key, index)=>{
		 	    let data ={}
		 		data['nivel']        = key,
		 		data['denominacion'] = e.denominacion[index],
		 		data['idEmpresa'] = idEmpresaUrl,
		 		data['estado'] = true,
		 		store.dispatch(guardaProceso(data)) 
		 	}) 
		}
	}
	
}

  

export default connect(mapStateToProps, mapsDispatchToProps)(procesoContain)