import React, {PureComponent}      from 'react'
import { Form, Input, Tooltip, Icon, Select, Row, Col, Divider, Button, AutoComplete } from 'antd';
import Estructura 				  from '../estructura/Estructura'
 

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

 

class Empresa extends React.Component {
  state = { autoCompleteResult: []};

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////			ENVIO DEL FORMULARIO PARA CREAR LAS EMPRESAS
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.valoresInput(values)
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
		    	<FormItem
			    	label="Website"
			    	>
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
   render() {
   	console.log(this.props.respuesta)
 
    return (
    	<Row>
	    	<Col offset={6} xs={12} sm={10} md={10} lg={12} xxl={{ span: 6, offset: 9 }}  >
	    		{/*  CREAR DATOS BASICOS DE LA EMPRSEA   */}
				{
					!this.props.respuesta
					?this.renderFormulario()
					:<Estructura />  
				}
 					


		    	
		   {/*  Estructura organizacional por cargos  
		   {this.props.status
		   	?<div>
			   	<Divider>Estructura organizacional por cargos</Divider>
			   <Estructura />  
			</div>
			:null
		   }*/}
		   

	    	</Col>
    	</Row>
    );
  }
}


export default Form.create()(Empresa)
