import {connect}        from 'react-redux'
import React     		from 'react'
import Empresa          from './EmpresaComponent.js'
import {guardaEmpresa}  from '../../redux/actionCreator'
import store 			from '../../redux/store.js'





const empresaContain =(props)=>{
	return(
		<Empresa 
			handleSubmit={(values)=>props.GuardarEmpresa(values)}
			respuesta={props.data} 
			//idEmpresa={props.data.status=='SUCCESS' ?props.data.empresa._id : null}
			idEmpresa='5b1246adc80a9c105300d7cd'
		/>
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