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
	if (action.type==='GUARDAR_EMPRESA') {
		return{
			...state,
			data:action.data
		}
	}
	return state
	if (action.type==='GUARDAR_ESTRUCTURA') {
		return{
			...state,
			data:action.data
		}
	}
	if (action.type==='OBTENER_EMPRESA') {
		return{
			...state,
			empresa:action.empresa
		}
	}
	return state
}

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}


export default createStore(reducer, { amigo:[], usuario:[], perfil:[], data:[], empresa:[] }, applyMiddleware(logger, thunk))