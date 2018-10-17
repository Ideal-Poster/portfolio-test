import React from 'react';
import '../components/Panel.css';
import anime from 'animejs'
import { Row, Col } from 'antd';

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

        	<svg width="20px" height="20px" id="icon--arrowup">
            <title>arrow up</title>
            <path d="M24.5 22.973H0L12.25.027z"></path>
          </svg>

          <div id="patch__icon">
            <p>Ideal Poster
              <br/>
              Nerd Services
            </p>
          </div>

          <p id="location">Flatbush Brooklyn New York NY 11215</p>

          <ul id="media__links">
            <li>
              <a href="" target="_blank">Github</a>
            </li>
            <li>
              <a href="" target="_blank">Instagram</a>
            </li>
          </ul>

          <a id="email__link"
            href="mailto:someone@example.com?Subject=Hello%20again"
            target="_top">
            Mgourdinedevelopment@gmail.com
          </a>

          <div id="description-center">
            <Row type="flex">
              <Col span={9} offset={3}>
                <h1 id="header">A COMPUTER PROGRAMMER WITH AN EYE FOR DESIGN</h1>
              </Col>
            </Row>

            <Row gutter={18} type="flex">
              <Col span={5} offset={3}>
                <p id="description-1">
                  1. &emsp; Development
                  <br/>
                  <br/>
                  A Fullstack Web developer with experience with  HMTL, CSS, Javascript, Node JS  and much more.  Experience  with REST API’s.
                </p>
              </Col>
              <Col span={5}>
                <p id="description-1">
                  2. &emsp; Design
                  <br/>
                  <br/>
                  Graphic and web design created using the latest design tools. I enjoy callorborate with other graphic artists and contributing to the work of others.              </p>
              </Col>
            </Row>
          </div>

          <Row >
            <Col offset={12} span={12}>
              <a id="intro__enter">Enter</a>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
export default Panel;