import React, {PureComponent}      from 'react'
import { Form, Input, Icon, Select, Row, Col, Divider, Button, AutoComplete, notification, Table } from 'antd';
 
 

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
let uuid = 0;

const alertaLogin = (type, mensaje) => {
  notification[type]({
    message: 'Super!!',
    description: mensaje,
  });
};
class Proceso extends React.Component {
   state = { autoCompleteResult: []};

	shouldComponentUpdate(nextProps, nextState) {
		nextProps.respuesta.status=='SUCCESS' && alertaLogin('success', 'Tu Proceso fue creado!!')
		return true;
	}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////			ENVIO DEL FORMULARIO PARA CREAR LAS EMPRESAS
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log(values)
				//this.props.valoresInput(values)
			}
		});
   }

   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ///////////////			RENDER
   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   render() {
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const { autoCompleteResult } = this.state;
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
			},
		};
		const formItemLayoutWithOutLabel = {
	      wrapperCol: {
	        xs: { span: 24, offset: 0 },
	        sm: { span: 20, offset: 4 },
	      },
	   }; 
 
	   let dataSource = []
		this.props.estructuras.map(e=>{
			dataSource.push(e._id)
		})
		console.log(this.props.estructuras)
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////			RENDER
		///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      return (	
    	<Row>
	    	<Col  xxl={{ span: 24, offset: 0 }}  >
			     {/* BOTONES PARA AGREGAR MAS ELEMENTOS */}
			    <Form onSubmit={this.handleSubmit}>

	      		{/* NOMBRE */}
					<FormItem {...formItemLayout} label={'Nombre'}>
						{getFieldDecorator(`nombre`, {
							validateTrigger: ['onChange', 'onBlur'],
							rules: [{required: true, message: "Campo Obligatorio"}],
						})(
							<Input />
						)}
					</FormItem>

		         {/* TIPO */}
		         <FormItem  {...formItemLayout} label='Tipo'>
				    	{getFieldDecorator(`tipo`, {
				    		rules: [{ required: true, message: 'Campo Obligatorio' }],
				    	})(
				    	<Input />
				    	)}
				   </FormItem>

				   {/* ALCANZE */}
		         <FormItem  {...formItemLayout} label='Alcanze'>
				    	{getFieldDecorator(`alcanze`, {
				    		rules: [{ required: true, message: 'Campo Obligatorio' }],
				    	})(
				    	<Input />
				    	)}
				   </FormItem>

				   {/* RECURSOS */}
		         <FormItem  {...formItemLayout} label='Recursos'>
				    	{getFieldDecorator(`recursos`, {
				    		rules: [{ required: true, message: 'Campo Obligatorio' }],
				    	})(
				    	<Input />
				    	)}
				   </FormItem>

				   {/* LIDER */}
		         <FormItem  {...formItemLayout} label='Lider'>
				    	{getFieldDecorator(`lider`, {
				    		rules: [{ required: true, message: 'Campo Obligatorio' }],
				    	})(
				    	<Input />
				    	)}
				   </FormItem>

				   {/* ESTADO */}
		         <FormItem  {...formItemLayout} label='Estado'>
				    	{getFieldDecorator(`estado`, {
				    		rules: [{ required: true, message: 'Campo Obligatorio' }],
				    	})(
				    	<Input />
				    	)}
				   </FormItem>

					{/* ESTRUCTURAS */}
		         <FormItem  {...formItemLayout} label='Estructuras'>
				    	{getFieldDecorator(`estructuras`, {
				    		rules: [{ required: true, message: 'Campo Obligatorio' }],
				    	})(
				    	<AutoComplete
					      style={{ width: 200 }}
					      dataSource={dataSource}
					      placeholder="try to type `b`"
					      filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
					    />
				    	)}
				   </FormItem>

					{/* GUARDAR */}
				   <FormItem {...formItemLayout}>
			    	  	<Button type="primary" htmlType="submit">Finalizar</Button>
		        	</FormItem>
				</Form>			   	
	    	</Col>
    	</Row>
      );
   }
}


export default Form.create()(Proceso)
