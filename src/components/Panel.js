import React from 'react';
import '../components/Panel.css';
import Anime from 'react-anime';

let debounce = (func, wait, immediate) => {
  var timeout;
  return () => {
    var context = this, args = arguments;
    var later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

let winsize = { width: window.innerWidth, height: window.innerHeight }

// this.DOM = { el: document.getElementById('intro__box') }


class Panel extends React.Component {
  componentDidMount() {
    this.DOM = { el: document.getElementById('intro__box') }
    this.boxRect = this.DOM.el.getBoundingClientRect()

    this.layout();

    this.isOpen = true;
    this.initEvents();

  }
  layout() {
    this.DOM.el.style.transform = `scaleX(${winsize.width/this.boxRect.width}) scaleY(${winsize.height/this.boxRect.height})`
  }
  initEvents() {
    this.onResize = () => {
      winsize = { width: window.innerWidth, height: window.innerHeight};
      if (this.isOpen) {
        this.layout();
      }
    };
    window.addEventListener('resize', debounce(() => this.onResize(), 10))
  }
  render() {
    return(
      <div id="intro">
        <div id="intro__box"/>
      </div>
    );
  }
}
export default Panel;