import axios from 'axios'

const agregar = data =>{
	return {
		type:'AGREGAR',
		data
	}
}

const elimina = key =>{
	return {
      type:'BORRAR',
      key
    }
}

const login = (values) =>{
	return dispatch=>{
		return axios.post('/x/v1/user/login', {username: values.username, password:values.password})
		.then(res=>{
			dispatch({
				type:'LOGIN',
				usuario:{usuario:res.data.usuario, code: res.data.code}
			})
		})
		.catch(err=>{
			dispatch({
				type:'ERROR_LOGIN',
				err
			})
		})
	}
}

const perfil = ()=>{
	return dispatch=>{
		return axios.get('/x/v1/user/profile')
		.then(res=>{
			dispatch({
				type:'PERFIL',
				perfil:res.data
			})
		})
		.catch(err=>{

		})
	}
}

const guardaEmpresa = (data) => {
	return dispatch=>{
		return axios.post('/x/v1/emp/empresa', data)
	   .then(res=>{
	   		dispatch({
	   			type:'GUARDAR_EMPRESA',
	   			data: res.data
	   		})
	   })
	}	   
}

const obtieneEmpresa = (idEmpresa)=>{
	return dispatch=>{
		return axios.get('/x/v1/emp/empresa/porEmpresa/'+idEmpresa)
	   .then(res=>{
   		dispatch({
   			type:'OBTENER_EMPRESA',
   			empresa: res.data
   		})
	   })
	}
}

const guardaEstructura = (data)=>{
	return dispatch=>{
		return axios.post('/x/v1/est/estructura', data)
	   .then(res=>{
	   		dispatch({
	   			type:'GUARDAR_ESTRUCTURA',
	   			data: res.data
	   		})
	   })
	}	
}
export {agregar, elimina, login, perfil, guardaEmpresa, guardaEstructura, obtieneEmpresa}



