import  React from 'react';
import TweenMax from 'gsap';

// Window sizes.
let winsize;
const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
calcWinsize();
window.addEventListener('resize', calcWinsize);


class Slide extends React.Component {
  constructor(el) {
    super();
    this.DOM = {el: el};
    // The image wrap element.
    this.DOM.imgWrap = this.DOM.el;
    // The image element.
    // this.DOM.img = this.DOM.imgWrap.querySelector('.slide__img');
    // The texts: the parent wrap, title, number and side text.

    this.calcSizes();
    // And also the transforms needed per position.
    // We have 5 different possible positions for a slide: center, bottom right, top left and outside the viewport (top left or bottom right).
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
    0: left top corner outside the viewport
    1: left top corner (prev slide position)
    2: center (current slide position)
    3: right bottom corner (next slide position)
    4: right bottom corner outside the viewport
    5: left side, for when the content is shown
    */
    this.transforms = [
      {x: -1*(winsize.width/2+this.width), y: 0, rotation: 0},
      {x: (this.width / 4) * -3, y: 0, rotation: 0},
      {x: 0, y: 0, rotation: 0},
      {x: (this.width / 4) * 3, y: 0, rotation: 0},
      {x: winsize.width/2+this.width, y: 0, rotation: 0},
      {x: -1*(winsize.width/2 - this.width/2 - winsize.width*0.075), y: 0, rotation: 0}
    ];
  }

  initEvents() {
    this.resizeFn = () => {
        this.calcSizes();
        this.calcTransforms();
    };
    window.addEventListener('resize', this.resizeFn);
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

  // Sets it as current.
  setCurrent(isContentOpen) {
    this.isCurrent = true;
    // this.DOM.el.classList.add('slide--current', 'slide--visible');
    // Position it on the current´s position.
    this.position(isContentOpen ? 5 : 2);
  }
  // Position the slide on the left side.
  setLeft(isContentOpen) {
      this.isRight = this.isCurrent = false;
      this.isLeft = true;
      // this.DOM.el.classList.add('slide--visible');
      // Position it on the left position.
      this.position(isContentOpen ? 0 : 1);
  }
  // Position the slide on the right side.
  setRight(isContentOpen) {
      this.isLeft = this.isCurrent = false;
      this.isRight = true;
      // this.DOM.el.classList.add('slide--visible');
      // Position it on the right position.
      this.position(isContentOpen ? 4 : 3);
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