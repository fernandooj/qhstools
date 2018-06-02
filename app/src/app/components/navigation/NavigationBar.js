// @flow weak

import React              from 'react';
import PropTypes          from 'prop-types';
import { Link }       from 'react-router-dom';
import axios from 'axios'
import { Menu, Icon, Avatar } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavigationBar extends React.Component{ 
  state = {
    current: 'usuario',
  }
  handleClick = (e) => {
    this.setState({current:e.key})
  }
  render(){
    return (
      <nav className="navbar navbar-default">
      <section >
        <h2>QhseTools</h2>
      </section>
      <section>
      { 
        this.props.showMenu
        &&<Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
          >
          <Menu.Item key="usuario">
            <Icon type="usergroup-add" />
            <Link to='usuario'>Usuarios</Link>
          </Menu.Item>
          <Menu.Item key="plan">
            <Icon type="usergroup-add" />
            <Link to='empresa'>Empresas</Link>
          </Menu.Item>
          <Menu.Item key="restriccion">
            <Icon type="lock" />
            <Link to='indicador'>Indicadores</Link>
          </Menu.Item>
          <Menu.Item key="categoria">
            <Icon type="lock" />
            <Link to='categoria'>xxxx</Link>
          </Menu.Item>
           
          <SubMenu title={<span><Avatar size="default" icon="user" />Ferdiland</span>}>
            <Menu.Item key="setting:1">Perfil</Menu.Item>
            <Menu.Item key="setting:2">Notificaciones</Menu.Item>
            <Menu.Item key="setting:3" onClick={()=>this.closeSession()}>Cerrar Sesión</Menu.Item>
          </SubMenu>
        </Menu>
      }
      </section>
      </nav>
    );
  }
  closeSession(){
    axios.get('/x/v1/logout')
    .then(e=>{
      window.location.href = "/";
    })
    .catch(err=>{

    })
  }
};

 

export default NavigationBar;
