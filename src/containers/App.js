import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
// import { connect } from 'react-redux';

import AppRoutes from '../routing/routes';
import { BrowserRouter as Router, Route } from "react-router-dom";
import connect from 'react-redux/lib/connect/connect';

const App = () => (
  <div>
    <Router>
      <Route path="/" component={AppRoutes}/>
    </Router>
  </div>
)

export default App;
