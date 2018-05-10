import React, {
  PureComponent
}     from 'react';
import store          from '../../redux/store'


const tomatela = [{nombre:'nombre', edad:20}]
class Test extends PureComponent {
	render(){

		return(
			<div onClick={()=>this.agrega(tomatela)}>agregar</div> 
		)
	}

	  agrega(data){
	      store.dispatch({
	          type:'AGREGAR',
	          data
	      })
	  }

}

export default Test