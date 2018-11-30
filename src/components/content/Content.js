import React from 'react';
import { TweenMax, Power3, Power4 } from 'gsap';

class Content extends React.Component {

  constructor(el) {
    super();
    this.DOM = {el: el};
    this.DOM.number = this.DOM.el.querySelector('.content__number');
    this.DOM.title = this.DOM.el.querySelector('.content__title');
    this.DOM.subtitle = this.DOM.el.querySelector('.content__subtitle');
    this.DOM.text = this.DOM.el.querySelector('.content__text');
    this.DOM.backCtrl = this.DOM.el.parentNode.querySelector('.content__close');
    // this.DOM.backCtrl.addEventListener('click', () => slideshow.hideContent());
    // console.log(this.DOM.backCtrl);
  }
  show() {
      this.DOM.el.classList.add('content__item--current');

      TweenMax.staggerTo([this.DOM.backCtrl,this.DOM.number,this.DOM.title,this.DOM.subtitle,this.DOM.text], 0.8, {
          ease: Power4.easeOut,
          delay: 0.4,
          opacity: 1,
          startAt: {y: 40},
          y: 0
      }, 0.05);
  }
  hide() {
      this.DOM.el.classList.remove('content__item--current');

      TweenMax.staggerTo([this.DOM.backCtrl,this.DOM.number,this.DOM.title,this.DOM.subtitle,this.DOM.text].reverse(), 0.3, {
          ease: Power3.easeIn,
          opacity: 0,
          y: 10
      }, 0.01);
  }
}

export default Content;