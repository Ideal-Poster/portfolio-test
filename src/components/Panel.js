import React from 'react';
import '../components/Panel.css';
import anime from 'animejs'
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
		this.DOM = {
			el: document.getElementById('intro__box'),
			enter: document.getElementById('intro__enter')
	 }
		// this.DOM.enter = document.getElementById('intro__enter');
		console.log(this.DOM.enter);


		this.animatableElems = Array.from(document.querySelectorAll('.animatable')).sort(() => 0.5 - Math.random());

    this.boxRect = this.DOM.el.getBoundingClientRect()
    this.layout();

    this.isOpen = true;
		this.initEvents();

  }
  layout() {
    this.DOM.el.style.transform = `scaleX(${winsize.width/this.boxRect.width}) scaleY(${winsize.height/this.boxRect.height})`
    // console.log(winsize.width/this.boxRect.width)

  }
  initEvents() {
		this.DOM.enter.addEventListener('click', (ev) => {
			ev.preventDefault();
			this.close();
		});


		// Window resize
    this.onResize = () => {
      winsize = { width: window.innerWidth, height: window.innerHeight };
      if (this.isOpen) {
        this.layout();
      }
    };
    window.addEventListener('resize', debounce(() => this.onResize(), 10))
	}
	close() {
		anime({
			targets: this.DOM.el,
			duration: 1000,
			scaleX: {value: 1, duration: 300, easing: 'easeOutQuad'},
			scaleY: {value: 1, duration: 700, delay: 300, easing: 'easeOutExpo'},
			complete: () => this.isAnimating = false
		});
	}



  render() {
    return(
      <div id="intro">
        <div id="intro__box"/>
        <div id="intro__title-wrap">
          <h1 id="intro__title"> Vonnoonv</h1>
					<a id="intro__enter">Enter</a>

        </div>
      </div>
    );
  }
}
export default Panel;