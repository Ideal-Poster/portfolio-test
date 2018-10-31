import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Panel from '../components/panel/Panel';
import Gallery from '../components/gallery/Gallery';
class App extends Component {


  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Gallery className="f"></Gallery>
        <Panel></Panel>
      </div>
    );
  }
}

export default App;
