import React, {PureComponent} from 'react'
import { Form, Input, Tooltip, Icon, Select, Row, Col, Steps, Button, AutoComplete, Modal } from 'antd';
import Estructura 			  from '../estructura/Estructura'
import Proceso 				  from '../proceso/Proceso'
 

const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;
const Step = Steps.Step;
const steps = [{
  title: 'Empresa',
}, {
  title: 'Estructura Organizacional',
}, {
  title: 'Proceso',
}];
 
class CrearEmpresa extends React.Component {
	state={
		autoCompleteResult: [],
		current:1,
		ModalTitle:'Nueva Empresa',
		confirmLoading:false,
		pedirData:false
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////			ENVIO DEL FORMULARIO PARA CREAR LAS EMPRESAS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.handleSubmit(values)
				this.setState({current:1})
			}
		});
	}
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////			AGREGA LAS EXTENSIONES DE LA EMPRESA
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	handleWebsiteChange = (value) => {
		let autoCompleteResult;
		if (!value) {
			autoCompleteResult = [];
		} else {
			autoCompleteResult = ['.com', '.org', '.net', '.co', '.co.com'].map(domain => `${value}${domain}`);
		}
		this.setState({ autoCompleteResult });
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   	///////////////			RENDER FORMULARIO EMPRESA
   	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    renderFormulario(){
		const { getFieldDecorator } = this.props.form;
		const { autoCompleteResult } = this.state;
		const websiteOptions = autoCompleteResult.map(website => (
			<AutoCompleteOption key={website}>{website}</AutoCompleteOption>
		));
		return (
	    	<Form onSubmit={this.handleSubmit}>
	        {/* NOMBRE */}
					<FormItem label='Nombre'>
		    	{getFieldDecorator('nombre', {
		    		rules: [{ required: true, message: 'Campo Obligatorio'  }],
		    	})(
		    	<Input placeholder="Nombre" />
		    	)}
		    	</FormItem>
		    {/* AREA */}
		    	<FormItem
			    	label={(
			    		<span>
			    		Area
			    		<Tooltip title="alguna ayuda">
			    		<Icon type="question-circle-o" />
			    		</Tooltip>
			    		</span>
			    	)}
		    	>
		    	{getFieldDecorator('area', {
		    		rules: [{ required: true, message: 'Campo Obligatorio' }],
		    	})(
		    	<Input placeholder="Area" />
		    	)}
		    	</FormItem>
		    {/* WEBSITE */}
		    	<FormItem label="Website" >
			    	{getFieldDecorator('website')(
			    	<AutoComplete
				    	dataSource={websiteOptions}
				    	onChange={this.handleWebsiteChange}
				    	placeholder="Url"
			    	>
			    		<Input />
			    	</AutoComplete>
			    	)}
		    	</FormItem>
		    	<FormItem>
		    		<Button type="primary" htmlType="submit">Guardar</Button>
		    	</FormItem>
	    	</Form>
    	);
    }
	render(){
		const {current, ModalTitle, confirmLoading, pedirData} = this.state
		return(
			<Modal title={ModalTitle}
	          visible={this.props.showModal}
	          onOk={this.handleOk}
	          confirmLoading={confirmLoading}
	          onCancel={()=>this.props.close(false)}
	          footer={null}
	          width={800}
	        >
		    	<Steps current={current} style={{marginBottom:20}}>
		        	{steps.map(item => <Step key={item.title} title={item.title} />)}
		      	</Steps>
	      		{
	      			current==0
	      			?this.renderFormulario()
	      			:current==1
	      			?<div>
		      			<Estructura 
		      				pedirData={pedirData}	
		      				idEmpresa={this.props.idEmpresa} 
		      				estructurasData={(estructuras)=>this.setState({estructuras})}
		      			/>
		      			<FormItem>
				    		<Button type="primary" onClick={this.pedirEstructuras.bind(this)}>Siguiente</Button>
				    	</FormItem>
				    </div>
	      			:<Proceso idEmpresa={this.props.idEmpresa} estructuras={this.state.estructuras} />
	      		}
		    </Modal>
		)
	}
	pedirEstructuras(){
		this.setState({current:2, pedirData:true})
	}
}



export default Form.create()(CrearEmpresa)