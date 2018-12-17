import React from 'react';
import '../panel/Panel.css';
import anime from 'animejs'
import { Row, Col } from 'antd';
import debounce from '../utils/debounce';

let winsize = { width: window.innerWidth, height: window.innerHeight }

class Panel extends React.Component {
  componentDidMount() {
		this.DOM = {
			el: document.getElementById('intro__box'),
      enter: document.getElementById('intro__enter'),
			enter_mobile: document.getElementById('enter__mobile')
   }

    this.DOM.logoImg = document.querySelector('#icon--arrowup');

		this.animatableElems = Array.from(document.querySelectorAll('.animatable')).sort(() => 0.5 - Math.random());

    this.boxRect = this.DOM.el.getBoundingClientRect()
    this.layout();

    this.isOpen = true;
    this.initEvents();

    this.close();

  }

  layout() {
    this.DOM.el.style.transform = `scaleX(${winsize.width/this.boxRect.width}) scaleY(${winsize.height/this.boxRect.height})`
  }

  initEvents() {
		this.DOM.enter.addEventListener('click', (ev) => {
			ev.preventDefault();
			this.close();
		});

    this.DOM.logoImg.addEventListener('click', (ev) => {
      ev.preventDefault();
      this.open();
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
    if ( !this.isOpen || this.isAnimating ) return;
    this.isOpen = false;
    this.isAnimating = true;


    // Logo
    anime.remove(this.DOM.logoImg);
    anime({
      targets: this.DOM.logoImg,
      translateY: [{value: '-400%', duration: 200, easing: 'easeOutQuad'}, {value: ['200%', '0%'], duration: 700, easing: 'easeOutQuint'}]
    });

    // Panel
    anime.remove(this.DOM.el);
		anime({
			targets: this.DOM.el,
			duration: 1000,
			scaleX: {value: 1, duration: 300, easing: 'easeOutQuad'},
			scaleY: {value: 1, duration: 700, delay: 300, easing: 'easeOutExpo'},
			complete: () => this.isAnimating = false
    });

    // Elements
    anime.remove(this.animatableElems);
    anime({
      targets: this.animatableElems,
      duration: 100,
      easing: 'easeOutQuad',
      translateX: '-30%',
      opacity: 0,
	    transform: 'rotate(90deg)'

    });
	}

  open() {
    if ( this.isOpen || this.isAnimating ) return;
    this.isOpen = true;
    this.isAnimating = true;

    anime.remove(this.DOM.logoImg);
    anime({
      targets: this.DOM.logoImg,
      translateY: [{value: '-400%', duration: 200, easing: 'easeOutQuad'}, {value: ['200%', '0%'], duration: 700, easing: 'easeOutExpo'}]
    });

    anime.remove(this.animatableElems);
    anime({
      targets: this.animatableElems,
      duration: 1200,
      delay: (t,i) => 300 + i*30,
      easing: 'easeOutExpo',
      translateX: '0%',
      opacity: {
        value: 1,
        easing: 'linear',
        duration: 400
      }
    });

    const boxRect = this.DOM.el.getBoundingClientRect();
    anime.remove(this.DOM.el);
    anime({
      targets: this.DOM.el,
      scaleX: {value: winsize.width/boxRect.width, duration: 700, delay: 300, easing: 'easeOutExpo'},
      scaleY: {value: winsize.height/boxRect.height, duration: 300, easing: 'easeOutQuad'},
      complete: () => this.isAnimating = false
    });

  }

  render() {

    return(
      <div id="intro">
        <div id="intro__box"/>
        <div id="intro__title-wrap">
          <a href="">
            <svg id="icon--arrowup">
              <title>arrow up</title>
              <path d="M24.5 22.973H0L12.25.027z"></path>
            </svg>
          </a>

          <ul id="media__links" className="animatable">
            <li>
              <a href="" target="_blank">Github</a>
            </li>
            <li>
              <a href="" target="_blank">Instagram</a>
            </li>
          </ul>

          <div id="patch__icon" className="animatable">
            <p>Ideal Poster
              <br/>
              Nerd Services
            </p>
          </div>

          <a id="email__link"
            href="mailto:someone@example.com?Subject=Hello%20again"
            target="_top"
            className="animatable">
            Mgourdinedevelopment@gmail.com
          </a>

          <div id="location-wrap">
            <p id="location" className="animatable">Flatbush Brooklyn New York NY 11215</p>
          </div>

          <Row type="flex">
            <Col offset={2} xs={20} md={19}>
              <div id="intro__title-center">
                <h1 id="intro__title" className="animatable">A COMPUTER PROGRAMMER WITH A LOVE FOR DESIGN.</h1>
              </div>
            </Col>
          </Row>
          <div id="description-row">
            <Row gutter={18} type="flex" justify="start">
              <Col offset={2} xs={6}>
                <p id="description__1" className="animatable">
                  1. &emsp; Development
                  <br/>
                  <br/>
                  A Fullstack Web developer with experience with  HMTL, CSS, Javascript, Node JS and much more. Experience with REST API’s.
                </p>
              </Col>
              <Col xs={6}>
                <p id="description__2" className="animatable">
                  2. &emsp; Design
                  <br/>
                  <br/>
                  Web design created using the latest design tools. Made using professional design concepts. I enjoy making digital and hand made art.</p>
              </Col>
              <Col id="shape__column" xs={24} sm={24} md={8} align="center">
                <img className="animatable" id="shape" src={require("../../assets/shape.png")} alt="shape"/>
              </Col>
            </Row>
            <Row>
              <Col offset={13} md={9} align="center">
                <a className="animatable" id="intro__enter">Enter</a>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
export default Panel;