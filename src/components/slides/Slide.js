import  React from 'react';
import { TweenMax, Power4, Power3 } from 'gsap';
import debounce from '../utils/debounce';
// Window sizes.
let winsize;
const calcWinsize = () => winsize = { width: window.innerWidth, height: window.innerHeight };
calcWinsize();
window.addEventListener('resize', debounce(calcWinsize, 5));

class Slide extends React.Component {
  constructor(el, index) {
    super();
    this.index = index;
    this.DOM = {
      el: el ,
      cover: el.querySelector('.overlay'),
      texts: { title: el.querySelectorAll('.slide__title') }
    };
    this.DOM.texts.title.reverse = Array.from(this.DOM.texts.title).reverse();

    this.calcSizes();
    // And also the transforms needed per position.
    this.calcTransforms();
    // Init/Bind events.
    this.initEvents();
  }

  calcSizes() {
    this.width = (this.DOM.el.offsetWidth);
    this.height = (this.DOM.el.offsetHeight);
  }

  // Gets the transforms per slide position.
  calcTransforms() {
    /*
    Each position corresponds to the position of a given slide:
    0: left outside the viewport
    1: left (prev slide position)
    2: center (current slide position)
    3: right (next slide position)
    4: right outside the viewport
    5: left side, for when the content is shown
    */
    this.transforms = [
      {x: -1*(winsize.width+this.width), y: 0, rotation: 0},
      {x: -1*(winsize.width/1.6), y: 0, rotation: 0},
      {x: 0, y: 0, rotation: 0},
      {x: (winsize.width/1.6), y: 0, rotation: 0},
      {x: winsize.width+this.width, y: 0, rotation: 0},
      {x: -1*(winsize.width/2 - this.width/2 - winsize.width*0.075), y: 0, rotation: 0}
    ];
  }

  initEvents() {
    this.resizeFn = () => {
      this.calcSizes();
      this.calcTransforms();
    };
    window.addEventListener('resize', debounce(this.resizeFn, 5));

    TweenMax.set(this.DOM.texts.title, { top: 100 });
  }

  position(pos) {
    TweenMax.set(this.DOM.el, {
      x: this.transforms[pos].x,
      y: this.transforms[pos].y,
      rotationX: 0,
      rotationY: 0,
      opacity: 1,
      rotationZ: this.transforms[pos].rotation
    });
  }

  moveToPosition(settings) {
    return new Promise((resolve, reject) => {
      /*
      Moves the slide to a specific position:
      -2: left top corner outside the viewport
      -1: left top corner (prev slide position)
      0: center (current slide position)
      1: right bottom corner (next slide position)
      2: right bottom corner outside the viewport
      3: left side, for when the content is shown
      */
      TweenMax.to(this.DOM.el, 1.5, {
          ease: Power3.easeInOut,
          delay: settings.delay || 0,
          startAt: settings.from !== undefined ? {
              x: this.transforms[settings.from+2].x,
              y: this.transforms[settings.from+2].y,
              rotationX: 0,
              rotationY: 0
              // rotationZ: 0
          } : {},
          x: this.transforms[settings.position+2].x,
          y: this.transforms[settings.position+2].y,
          rotationX: 0,
          rotationY: 0,
          // rotationZ: this.transforms[settings.position+2].rotation,
          onStart: settings.from !== undefined ? () => TweenMax.set(this.DOM.el, {opacity: 1}) : null,
          onComplete: resolve
        });
    });
  }

  fadeIn() {
    TweenMax.from(this.DOM.cover, 1.2, {
      y: '10%',
      ease: Power4.easeOut,
      opacity: 0
    });

    TweenMax.to(this.DOM.cover, 1.2, {
      opacity: 1
    });
  }

  showTitle() {
    TweenMax.set(this.DOM.texts.title, { opacity: 1 });

    setTimeout(() => {
      TweenMax.staggerTo(this.DOM.texts.title, 1.2, {
        ease: Power4.easeOut,
        opacity: 1,
        top: '0'
      }, 0.05)
    }, 300);
  }

  hideTitle() {
    TweenMax.staggerTo(this.DOM.texts.title.reverse, 1.2, {
      ease: Power4.easeInOut,
      top: '110'
    }, 0.05);
    setTimeout(() => {
      TweenMax.set(this.DOM.texts.title.reverse,{ opacity: 0 });
    }, 1200);
  }

  hideTitleUp() {
    TweenMax.to(this.DOM.texts.title, 1.2, {
      ease: Power4.easeInOut,
      opacity: 0,
      top: '-75'
    });
  }

  cover() {
    this.DOM.cover.style.transformOrigin = "left 0% 0px";
    TweenMax.to(this.DOM.cover, 1.2, {
      height: 0,
      ease: Power4.easeInOut
    });
  }

  uncover() {
    TweenMax.to(this.DOM.cover, 1.2, { scaleY: 0, bottom: 0, ease: Power4.easeInOut });
  }
  // Sets it as current.
  setCurrent(isContentOpen) {
    this.isCurrent = true;
    this.isLeft = false;
    this.isRight = false;
    // Position it on the current´s position.
    this.position(isContentOpen ? 5 : 2);
  }
  // Position the slide on the left side.
  setLeft(isContentOpen) {
    this.isCurrent = false;
    this.isRight = this.isCurrent = false;
    this.isLeft = true;
    // Position it on the left position.
    this.position(isContentOpen ? 0 : 1);
  }

  setLeftOutView(isContentOpen) {
    this.isCurrent = false;
    this.isRight = this.isCurrent = false;
    this.isLeft = true;
    // Position it on the left position.
    this.position(0);
  }
  // Position the slide on the right side.
  setRight(isContentOpen) {
    this.isCurrent = false;
    this.isLeft = this.isCurrent = false;
    this.isRight = true;
    // Position it on the right position.
    this.position(3);
  }

  setRightOutView() {
    this.isCurrent = false;
    this.isLeft = this.isCurrent = false;
    this.isRight = true;

    this.position(4);
  }

  setContentOpen() {
    this.position(5);
  }
  // Check if the slide is positioned on the right side (if it´s the next slide in the slideshow).
  isPositionedRight() {
    return this.isRight;
  }
  // Check if the slide is positioned on the left side (if it´s the previous slide in the slideshow).
  isPositionedLeft() {
    return this.isLeft;
  }
  // Check if the slide is the current one.
  isPositionedCenter() {
    return this.isCurrent;
  }
}

export default Slide;