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
    this.DOM = {el: el};
    // The image wrap element.
    this.DOM.imgWrap = this.DOM.el;
    // The image element.
    this.DOM.img = this.DOM.imgWrap.querySelector('.slide__img');
    // Slide cover
    this.DOM.cover = this.DOM.imgWrap.querySelector('.overlay');
    this.DOM.coverColored = this.DOM.imgWrap.querySelector('.overlay__color')
    // The texts: the parent wrap, title, number and side text.
    this.DOM.texts = {
      wrap: this.DOM.el.querySelector('.slide__title-wrap'),
      title: this.DOM.el.querySelectorAll('.slide__title'),
      number: this.DOM.el.querySelector('.slide__number')
    };

    this.DOM.texts.title.reverse = Array.from(this.DOM.texts.title).reverse();

    this.calcSizes();
    // And also the transforms needed per position.
    this.calcTransforms();
    // Init/Bind events.
    this.initEvents();
  }

  calcSizes() {
    this.width = (this.DOM.imgWrap.offsetWidth);
    this.height = (this.DOM.imgWrap.offsetHeight);
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
      {x: -1*(winsize.width/1.5), y: 0, rotation: 0},
      {x: 0, y: 0, rotation: 0},
      {x: (winsize.width/1.5), y: 0, rotation: 0},
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
  }

  position(pos) {
    TweenMax.set(this.DOM.imgWrap, {
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
      TweenMax.to(this.DOM.imgWrap, 1.2, {
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
          onStart: settings.from !== undefined ? () => TweenMax.set(this.DOM.imgWrap, {opacity: 1}) : null,
          onComplete: resolve
        });

        // Reset image scale when showing the content of the current slide.
        // if ( settings.resetImageScale ) {
        //     TweenMax.to(this.DOM.img, .8, {
        //         ease: Power4.easeInOut,
        //         scale: 1
        //     });
        // }
    });
  }

  fadeIn() {
    // this.DOM.cover.style.transformOrigin = "left 0% 0px";
    TweenMax.set(this.DOM.cover, { bottom: 0, top: '100%' });

    TweenMax.from(this.DOM.el, 1.2, {
      y: 120,
      ease: Power4.easeOut,
      opacity:0
    });

    TweenMax.to(this.DOM.img, 1.2, {
      opacity: 1
    });
  }

  showTitle() {
    setTimeout(() => {
      TweenMax.set(this.DOM.texts.title, { opacity: 1.2, top:'50px' });
      TweenMax.staggerTo(this.DOM.texts.title, 1.2, {
        ease: Power4.easeInOut,
        opacity: 1,
        top: '0px'
      }, 0.05)
    }, 300);
  }

  hideTitle() {
    TweenMax.staggerTo(this.DOM.texts.title.reverse, 1.2, {
      ease: Power4.easeInOut,
      opacity: 0,
      top: '50px'
    }, 0.05);
  }

  hideTitleUp() {
    TweenMax.to(this.DOM.texts.title, 1.2, {
      ease: Power4.easeInOut,
      opacity: 0,
      top: '-75%'
    });
  }

  cover() {
    TweenMax.set(this.DOM.cover, { scaleY: 1, left:-1, right:-1, bottom:-1, top:'100%'});

    this.DOM.cover.style.transformOrigin = "left 0% 0px";
    TweenMax.to(this.DOM.cover, 1.2, { scaleY: 1, top: 0, ease: Power4.easeInOut });
  }

  uncover() {
    TweenMax.to(this.DOM.cover, 1.2, { scaleY: 0, bottom: 0, ease: Power4.easeInOut });
  }
  // Sets it as current.
  setCurrent(isContentOpen) {
    this.isCurrent = true;
    this.isLeft = false;
    this.isRight = false;
    // this.DOM.el.classList.add('slide--current', 'slide--visible');
    // Position it on the current´s position.
    this.position(isContentOpen ? 5 : 2);
  }
  // Position the slide on the left side.
  setLeft(isContentOpen) {
    this.isCurrent = false;
    this.isRight = this.isCurrent = false;
    this.isLeft = true;
    // this.DOM.el.classList.add('slide--visible');
    // Position it on the left position.
    this.position(isContentOpen ? 0 : 1);
  }

  setLeftOutView(isContentOpen) {
    this.isCurrent = false;
    this.isRight = this.isCurrent = false;
    this.isLeft = true;
    // this.DOM.el.classList.add('slide--visible');
    // Position it on the left position.
    this.position(0);
  }
  // Position the slide on the right side.
  setRight(isContentOpen) {
    this.isCurrent = false;
    this.isLeft = this.isCurrent = false;
    this.isRight = true;
    // this.DOM.el.classList.add('slide--visible');
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
  // Reset classes and state.
  reset() {
    this.isRight = this.isLeft = this.isCurrent = false;
    this.DOM.el.classList = 'slide';
  }

  hide() {
    TweenMax.set(this.DOM.imgWrap, {rotationX:0, rotationY:0, rotationZ:0, opacity:0});
  }
}
export default Slide;