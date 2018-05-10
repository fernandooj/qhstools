import {createStore} from 'redux';

// const reducer = (state, action)=>{
// 	if (action.type==='ADD_TO_CART'){
// 		return{
// 			...state,
// 			cart: state.cart.concat(action.product)
// 		}	
// 	}

// 	return state
// };

// export default createStore(reducer, {cart:[]})




const reducer = (state, action)=>{
	if(action.type==='AGREGAR'){
		console.log(action.data)
		return{
			...state,
			amigo: state.amigo.concat(action.data)
		}
	}
	if(action.type==='BORRAR'){
		console.log(state.amigo)
		return{
			...state,
			amigo:state.amigo.filter((e, key)=>{ return key !== action.key})
		}
	}
	return state
}


export default createStore(reducer, { amigo:[] })