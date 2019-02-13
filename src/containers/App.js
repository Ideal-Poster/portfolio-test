import React from 'react';
import 'antd/dist/antd.css';
import './App.css';

import AppRoutes from '../routing/routes';
import { BrowserRouter as Router, Route } from "react-router-dom";

const App = () => (
  <div>
    <Router>
      <Route path="/" component={AppRoutes}/>
    </Router>
  </div>
)

export default App;
