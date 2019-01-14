import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
// import Panel from '../components/panel/Panel';
import Slideshow from '../components/slideshow/Slideshow';
class App extends Component {


  constructor() {
    super();
  }

  render() {
    return (
      <div>
        {/* <Panel></Panel> */}
        <Slideshow></Slideshow>
      </div>
    );
  }
}

export default App;
