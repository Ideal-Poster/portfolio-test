import  React from 'react';
import '../slideshow/Slideshow.css';
// import anime from 'animejs';
import TweenMax from 'gsap';
import Slide from '../slides/slide';


let winsize;
const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
calcWinsize();
window.addEventListener('resize', calcWinsize);

class Slideshow extends React.Component {

  componentDidMount() {
    this.DOM = {};
    // this.DOM.slide = document.querySelector('.slide');

    this.slides = [];
    document.querySelectorAll('.slide').forEach(slideEl => this.slides.push(new Slide(slideEl)));

    this.slidesTotal = this.slides.length;
    this.current = 0;

    this.setPos();
    window.addEventListener('resize', () => this.setPos());
  }

  init() {

  }

  setPos() {
    this.nextOutView2 = this.slides[this.current + 3];
    this.nextOutView = this.slides[this.current+2];
    this.nextSlide = this.slides[this.current+1];
    this.currentSlide = this.slides[this.current];
    this.prevSlide = this.slides[this.current-1];
    this.prevOutView = this.slides[this.current-2];
    this.prevOutView2 = this.slides[this.current-3];


    this.currentSlide.setCurrent()
    if (this.nextSlide) this.nextSlide.setRight();
    if (this.nextOutView) this.nextOutView.setRightOutView();
    if (this.nextOutView2) this.nextOutView2.setRightOutView();
    if (this.prevSlide) this.prevSlide.setLeft();
    if (this.prevOutView) this.prevOutView.setLeftOutView();
    if (this.prevOutView2) this.prevOutView2.setLeftOutView();

  }

  // Navigate the slideshow.
  navigate(direction) {
    // If animating return.
    // if ( this.isAnimating ) return;
    // this.isAnimating = true;

    const upcomingPos = direction === 'next' ? this.current + 1 : this.current - 1;
    this.upcomingSlide = this.slides[upcomingPos];

    // Move previous slide to current or out of view left
    if (this.prevSlide) {
      this.prevSlide.moveToPosition({ position: direction === 'next' ? -2 : 0 });
    }

    // Slide current slide forwards or backwards
    this.currentSlide.moveToPosition({ position: direction === 'next' ? -1 : 1 }).then(() => {
      this.setPos();
    });

    // Slide next slide to current or out of view right
    if (this.nextSlide) {
      this.nextSlide.moveToPosition({ position: direction === 'next' ? 0 : 2 });
    }

    // Slide into view right
    if (this.nextOutView) {
      this.nextOutView.moveToPosition({ position: direction === 'next' ? 1 : 2});
    }

    if (this.prevOutView) {
      this.prevOutView.moveToPosition({ position: direction === 'next' ? -2 : -1});
    }

    // Update Current
    this.current = (direction === 'next') ?
    // stop next counter if at the end of slides
    this.current <= this.slides.length-2 ? this.current+1 : this.current :
    // stop prev counter id at beginning of slides
    this.current > 0 ? this.current-1 : this.current;

  }

  render() {
    return(
      <div id="gallery">
        <div id="slideshow">
            <div className="slide slide1">
              <img src={require("../../assets/1.png") } className="slide__img"/>
            </div>
            <div className="slide slide2">
              <img src={require("../../assets/2.png") } className="slide__img"/>
            </div>
            <div className="slide slide3">
              <img src={require("../../assets/3.png") } className="slide__img"/>
            </div>
            <div className="slide slide4">
              <img src={require("../../assets/4.png") } className="slide__img"/>
            </div>
            {/* <div className="slide">
              <img src={require("../../assets/1.png") } className="slide__img"/>
            </div> */}
            {/* <div className="slide">
              <img src={require("../../assets/1.png") } className="slide__img"/>
            </div> */}
        </div>
        <button id="prev" onClick={
          () => {
            if (!(this.current === 0)) this.navigate('prev')
          }
        }>Prev</button>
        <button id="next" onClick={
          () => {
           if (!(this.current === this.slides.length-1)) this.navigate('next')
          }
        } >Next</button>
      </div>
    );
  }
}
export default Slideshow;