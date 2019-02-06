import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Slideshow from '../components/slideshow/Slideshow';

import AppRoutes from '../routing/routes';
import { BrowserRouter as Router, Route } from "react-router-dom";


const App = () => (
  <div>
    {/* <Slideshow></Slideshow> */}
    {/* <Project></Project> */}
    <Router>
      <Route path="/" component={AppRoutes}/>
    </Router>

  </div>
)

export default App;
