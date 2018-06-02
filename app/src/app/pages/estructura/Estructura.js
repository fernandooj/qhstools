import {connect}      from 'react-redux'
import React     from 'react'
import Estructura from './estructuraComponent.js'
import {guardaEstructura, obtieneEstructura}      from '../../redux/actionCreator'
import store from '../../redux/store.js'
 

const estructuraContain =(props)=>{
	if (props.pedirData) {
		console.log(props.estructuras)
		props.estructurasData(props.estructuras)
	}
	
	return(
		<Estructura 
			valoresInput={(values)=>props.GuardarEstructura(values, props.idEmpresa)} 
			estructuras={props.estructuras} 
			respuesta={props.estructura}
		/>
	)
}

const mapStateToProps = (state) =>{
	return{
		estructura:state.estructura,
		estructuras:state.estructuras
	}
}

 
const mapsDispatchToProps = (dispatch) =>{
	return {
		GuardarEstructura(e, idEmpresa) {
			e.nivel.forEach((key, index)=>{
		 	    let data ={}
		 		data['nivel']        = key,	
		 		data['denominacion'] = e.denominacion[index],
		 		data['idEmpresa'] = idEmpresa,
		 		data['estado'] = true,
		 		store.dispatch(guardaEstructura(data))
		 		store.dispatch(obtieneEstructura(idEmpresa))
		 	}) 
		}
	}
	
}

  

export default connect(mapStateToProps, mapsDispatchToProps)(estructuraContain)