import React, { Component } from 'react';
import Anime from 'react-anime';
import './App.css';
import Panel from '../components/Panel'

class App extends Component {


  constructor() {
    super();
    console.log(Anime);

  }

  render() {
    return (
      <Panel></Panel>
    );
  }
}

export default App;
