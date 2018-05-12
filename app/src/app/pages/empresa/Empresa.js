import {connect}        from 'react-redux'
import React     		from 'react'
import { notification } from 'antd';
import Empresa          from './empresaComponent.js'
import {guardaEmpresa}  from '../../redux/actionCreator'
import store 			from '../../redux/store.js'


const alertaLogin = (type, mensaje) => {
  notification[type]({
    message: 'Super!!',
    description: mensaje,
  });
};


const empresaContain =(props)=>{
	//store.dispatch(obtieneEmpresa(props.match.params.id))
	//console.log(props)
	if (props.data.status=='SUCCESS') {
		alertaLogin('success', 'Tu Empresa fue creada!! Ahora puedes agregar estructuras y procesos')
		props.history.push(`/empresas/${props.data.empresa._id}`);
		props.data.status = null
	}
	return(
		<Empresa valoresInput={(values)=>props.GuardarEmpresa(values)} respuesta={props.match.params.id ?true :false} />
	)
}

const mapStateToProps = (state) =>{
	return{
		data:state.data,
		empresa:state.empresa
	}
}

 
const mapsDispatchToProps = (dispatch) =>{
	return {
		GuardarEmpresa(e) {
	      	e['estado']=true
	        store.dispatch(guardaEmpresa(e))
		}
	}
	
}

  

export default connect(mapStateToProps, mapsDispatchToProps)(empresaContain)