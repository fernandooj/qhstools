import {connect}      from 'react-redux'
import React     from 'react'
import Estructura from './estructuraComponent.js'
import {guardaEstructura}      from '../../redux/actionCreator'
import store from '../../redux/store.js'
import { notification } from 'antd';

const alertaLogin = (type, mensaje) => {
  notification[type]({
    message: 'Super!!',
    description: mensaje,
  });
};


const estructuraContain =(props)=>{
	if (props.data.status=='SUCCESS') {
		alertaLogin('success', 'Tu Estructura fue creada!!')
	}
	return(
		<Estructura valoresInput={(values)=>props.GuardarEstructura(values)} respuesta={props.data} />
	)
}

const mapStateToProps = (state) =>{
	return{
		data:state.data
	}
}

 
const mapsDispatchToProps = (dispatch) =>{
	return {
		GuardarEstructura(e) {
			e.nivel.forEach((key, index)=>{
		 	    let data ={}
		 		data['nivel']        = key,
		 		data['denominacion'] = e.denominacion[index],
		 		data['estado'] = true,
		 		store.dispatch(guardaEstructura(data)) 
		 	}) 
		}
	}
	
}

  

export default connect(mapStateToProps, mapsDispatchToProps)(estructuraContain)