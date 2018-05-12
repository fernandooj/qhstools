// @flow weak

import React        from 'react';
import {
  Route,
  Switch
}                    from 'react-router';
import Home          from '../pages/home/Home';
import Dashboard     from '../pages/dashboard/Dashboard';
import Empresa       from '../pages/empresa/Empresa';
 
 

const MainRoutes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/empresa/"   component={Empresa} />
      <Route path="/empresas/:id"   component={Empresa} />
    </Switch>
  );
};

export default MainRoutes;
