import React, {PureComponent}      from 'react'
import { Form, Input, Tooltip, Icon, Select, Row, Col, Divider, Button, AutoComplete } from 'antd';
 
 

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
let uuid = 0;


class Estructura extends React.Component {
  state = { autoCompleteResult: []};

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////			ENVIO DEL FORMULARIO PARA CREAR LAS EMPRESAS
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				this.props.valoresInput(values)
			}
		});
   }

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////			ELIMINO ESTRUCTURAS
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	remove = (k) => {
		console.log(k)
		const { form } = this.props;
		// can use data-binding to get
		const keys = form.getFieldValue('keys');
		// We need at least one passenger
		if (keys.length === 1) {
			return;
		}
		// can use data-binding to set
		form.setFieldsValue({
			keys: keys.filter(key => key !== k),
		});
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	///////////////			AGREGO UNA NUEVA ESTRUCTURA
	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   add = () => {
		const { form } = this.props;
		// can use data-binding to get
		const keys = form.getFieldValue('keys');
		const nextKeys = keys.concat(uuid);
		uuid++;
		// can use data-binding to set
		// important! notify form to detect changes
		form.setFieldsValue({
		keys: nextKeys,
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
		getFieldDecorator('keys', { initialValue: [] });
      const keys = getFieldValue('keys');
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		///////////////			RENDER
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      const formItems = keys.map((k, index) => {
      	//index =index+1
	      return (
	      	<div key={k}>
	      		{/* NIVEL */}
	     
		         <FormItem {...formItemLayout} label={'Nivel'} required={false}>
			          {getFieldDecorator(`nivel[${index}]`, {
			            validateTrigger: ['onChange', 'onBlur'],
			            rules: [{required: true, message: "Campo Obligatorio"}],
			          })(
			            <Input />
			          )}
		         </FormItem>

		         {/* DENOMINACION */}
		         <FormItem  {...formItemLayout} label='Denominacion'>
				    	{getFieldDecorator(`denominacion[${index}]`, {
				    		rules: [{ required: true, message: 'Campo Obligatorio', whitespace: true }],
				    	})(
				    	<Input />
				    	)}
				    {/* BOTON ELIMINAR */}
				    	{keys.length > 1 ? (
			            <Icon
			              className="dynamic-delete-button"
			              type="minus-circle-o"
			              disabled={keys.length === 1}
			              onClick={() => this.remove(index)}
			            />
			          ) : null} 
				   </FormItem>
				</div>
	         
	      );
	    });
		const websiteOptions = autoCompleteResult.map(website => (
			<AutoCompleteOption key={website}>{website}</AutoCompleteOption>
		));

      return (
    	<Row>
	    	<Col offset={0} xs={12} sm={10} md={10} lg={12} xxl={{ span: 24, offset: 0 }}  >
		   {/*  Estructura organizacional por cargos  */}
		   <Divider>Estructura organizacional por cargos</Divider>
		   	<Form onSubmit={this.handleSubmit}>

		    
			    	{formItems}

			    	<FormItem {...formItemLayoutWithOutLabel}>
			    	  <Button type="primary" htmlType="submit">Guardar</Button>
		           <Button type="dashed" onClick={this.add} style={{ width: '60%', marginLeft:10 }}>
		            <Icon type="plus" /> agregar Campo
		           </Button>
		          
		        </FormItem>
		    	 
		    	</Form> 

	    	</Col>
    	</Row>
    );
  }
}


export default Form.create()(Estructura)
