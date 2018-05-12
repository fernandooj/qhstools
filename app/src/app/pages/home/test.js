import React, { Component
}     from 'react';
import store          from '../../redux/store'
import {agregar}    from '../../redux/actionCreator'
import {connect}      from 'react-redux'
const tomatela = [{nombre:'nombre', edad:20}]
class Test extends Component {
	render(){
		return(
			<div onClick={()=>this.props.agrega(tomatela)}>agregar</div> 
		)
	}

	agrega(data){
		console.log(this.props)
		store.dispatch(agregar(data))
	}

}


const mapStateToProps = state=>{
  return{
    amigo:state.amigo
  }
}

const mapDispatchToProps = dispatch=>{
  return{
    agrega(data){
      dispatch(agregar(data))
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Test);