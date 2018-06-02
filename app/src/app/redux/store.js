import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
const reducer = (state, action)=>{
	if(action.type==='LOGIN') {
		return{
			...state,
		 	usuario:action.usuario,
		}
	}
	if(action.type==='AGREGAR'){
		return{
			...state,
			amigo: state.amigo.concat(action.data)
		}
	}
	if(action.type==='BORRAR'){
		return{
			...state,
			amigo:state.amigo.filter((e, key)=>{ return key !== action.key})
		}
	}
	if (action.type==='PERFIL') {
		return{
			...state,
			perfil:action.perfil
		}
	}
	if (action.type==='OBTENER_EMPRESA') {
		return{
			...state,
			empresa:action.empresa
		}
	}
	if (action.type==='GUARDAR_EMPRESA') {
		return{
			...state,
			data:action.data
		}
	}
	if (action.type==='OBTENER_ESTRUCTURA') {
		return{
			...state,
			estructuras:action.estructuras
		}
	}
	if (action.type==='GUARDAR_ESTRUCTURA') {
		return{
			...state,
			estructuras: [action.estructura, ...state.estructura],
			estructura:  action.estructura
		}
	}
	if (action.type==='OBTENER_PROCESO') {
		return{
			...state,
			procesos:action.procesos
		}
	}
	if (action.type==='GUARDAR_PROCESO') {
		return{
			...state,
			procesos: [action.proceso, ...state.proceso],
			proceso:  action.proceso
		}
	}
	

	return state
}

const logger = store => next => action => {
  //console.log('dispatching', action)
  let result = next(action)
  //console.log('next state', store.getState())
  return result
}


export default createStore(reducer, { 
		amigo:[], usuario:[], perfil:[], data:[], empresa:[], estructura:[], estructuras:[], proceso:[], procesos:[] 
	}, applyMiddleware(logger, thunk))








