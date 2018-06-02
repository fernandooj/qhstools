import React, {PureComponent} from 'react'
import { Form, Input, Tooltip, Icon, Select, Row, Col, Breadcrumb, Button, notification } from 'antd';
 
import CrearEmpresa  from './CrearEmpresa'
 
 
const alertaLogin = (type, mensaje) => {
  notification[type]({
    message: 'Genial!!',
    description: mensaje,
  });
};

class Empresa extends React.Component {
	state = { 
		autoCompleteResult: [],
		current:0,
		showModal:true
	};
	shouldComponentUpdate(nextProps, nextState) {
		nextProps.respuesta.status=='SUCCESS' && alertaLogin('success', 'Tu Empresa fue creada!! Ahora puedes agregar estructuras')
		return true;
	}

    render() { 
   		return (
	    	<Row>
		    	<Col offset={1} md={22} xxl={{ span: 20, offset: 2 }}  >
			    	<div style={{position:'relative', zIndex: 100,}}>
				    	<Breadcrumb style={{float:'left'}}>
				    	<Breadcrumb.Item>Home</Breadcrumb.Item>
				    	<Breadcrumb.Item><a href="">Planes</a></Breadcrumb.Item>
				    	</Breadcrumb>
				    	<Button type="primary" icon="plus" size='large' style={{float:'right', 'marginBottom':30}} onClick={()=>this.setState({showModal:true})}>Nuevo</Button>
				    	<CrearEmpresa 
					    	showModal={this.state.showModal} 
					    	close={() =>this.setState({showModal:false})} 
					    	handleSubmit={(values)=>this.props.handleSubmit(values)} 
					    	idEmpresa={this.props.idEmpresa}
				    	/>
			    	</div>
	 
		    	</Col>
	    	</Row>
    	);
    }
}


export default Empresa
