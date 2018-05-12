// @flow weak

import React, {
  PureComponent
}                     from 'react';
import PropTypes      from 'prop-types';
import {Jumbotron}    from '../../components';
import classnames     from 'classnames/bind';
import { Link }       from 'react-router-dom';
import AnimatedView   from '../../components/animatedView/AnimatedView';
import styles         from './home.scss';
import {connect}      from 'react-redux'
import Test           from './test'
import {login}      from '../../redux/actionCreator'
import store        from '../../redux/store.js'
import { Form, Icon, Input, Button, Checkbox, Row, Col, Divider } from 'antd';
import 'antd/dist/antd.css'; 

const FormItem = Form.Item;
// IMPORTANT: we need to bind classnames to CSSModule generated classes: fernandooj@ymail.com
const cx = classnames.bind(styles);

const Home = (props)=> {
    const { getFieldDecorator, validateFields } = props.form;
    let infoProps = props
    return(
      <AnimatedView>
        <Jumbotron>
          <Row >
            <Col offset={6} xs={12} sm={10} md={10} lg={12} xxl={{ span: 6, offset: 9 }}  >
              <Form onSubmit={(e)=>props.handleSubmit(e, validateFields, infoProps)} className="login-form">
                <FormItem>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Inserta tu username!' }],
                  })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Inserta tu Password!' }],
                  })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                  })(
                  <Row>
                    <Col span={8} offset={4} >
                      <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                    </Col>
                    <Col span={8} offset={4} >
                      <Link className="login-form-forgot" to="/about">Olvide Mi Clave</Link>
                    </Col>
                  </Row>
                  )}
                   
                </FormItem>
                
                <Divider>O inicia sesion con </Divider>
               
                <div>
                  <Icon type="facebook"/>
                  <p> acebook </p>
                </div>  
                 <div>
                  <Icon type="google"/>
                  <p> oogle </p>
                </div> 

                <Divider>O</Divider>
                <a href="">Registrate Ahora!</a>

              </Form>
            </Col>
          </Row>

          
        </Jumbotron>
      </AnimatedView>
    );
 
}

 
const mapStateToProps = state=>{
  return{
    usuario:state.usuario
  }
}
const mapDispatchToProps = dispatch=>{
  return{
    handleSubmit(e, validateFields, papi){
      e.preventDefault()
      validateFields((err, values) => {
        console.log(values)
        if (!err) {
          store.dispatch(login(values))
        }
      });
      
    }
  }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(Home));
