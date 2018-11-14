import  React from 'react';
import '../slideshow/Slideshow.css';
import anime from 'animejs';
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
    this.current = 1;



    this.setPos();

    console.log(this.currentSlide);
    window.addEventListener('resize', () => this.setPos());

    setTimeout(() => {
      this.navigate('next');
    }, 1000);
  }

  setPos() {
    this.currentSlide = this.slides[this.current];
    this.nextSlide = this.slides[this.current+1 <= this.slidesTotal-1 ? this.current+1 : 0];
    this.prevSlide = this.slides[this.current-1 >= 0 ? this.current-1 : this.slidesTotal-1];
    this.currentSlide.setCurrent();
    this.nextSlide.setRight();
    this.prevSlide.setLeft();
  }

  // Navigate the slideshow.
  navigate(direction) {
    // If animating return.
    if ( this.isAnimating ) return;
    this.isAnimating = true;


    const upcomingPos = direction === 'next' ?
            this.current < this.slidesTotal-2 ? this.current+2 : Math.abs(this.slidesTotal-2-this.current):
            this.current >= 2 ? this.current-2 : Math.abs(this.slidesTotal-2+this.current);

    this.upcomingSlide = this.slides[upcomingPos];

    // Update current.
    this.current = direction === 'next' ?
            this.current < this.slidesTotal-1 ? this.current+1 : 0 :
            this.current > 0 ? this.current-1 : this.slidesTotal-1;

    // Move slides (the previous, current, next and upcoming slide).
    this.prevSlide.moveToPosition({position: direction === 'next' ? -2 : 0}).then(() => {
        if ( direction === 'next' ) {
            this.prevSlide.hide();
        }
    });

    this.currentSlide.moveToPosition({position: direction === 'next' ? -1 : 1 });

    this.nextSlide.moveToPosition({position: direction === 'next' ? 0 : 2, delay: direction === 'next' ? 0 : 0 }).then(() => {
        if ( direction === 'prev' ) {
            this.nextSlide.hide();
        }
    });

    // if ( direction === 'next' ) {
    //     this.nextSlide.showTexts();
    // }
    // else {
    //     this.prevSlide.showTexts();
    // }

    this.upcomingSlide.moveToPosition({position: direction === 'next' ? 1 : -1, from: direction === 'next' ? 2 : -2 }).then(() => {
        // Reset classes.
        [this.nextSlide,this.currentSlide,this.prevSlide].forEach(slide => slide.reset());
        this.render();
        this.isAnimating = false;
    });
}

  render() {
    return(
      <div id="gallery">
        <div id="slideshow">
            <div className="slide left__slide">
              <img src={require("../../assets/1.png") } className="slide__img"/>
            </div>
            <div className="slide center__slide">
              <img src={require("../../assets/1.png") } className="slide__img"/>
            </div>
            <div className="slide right__slide">
              <img src={require("../../assets/1.png") } className="slide__img"/>
            </div>
            <div className="slide">
              <img src={require("../../assets/1.png") } className="slide__img"/>
            </div>
            {/* <div className="slide">
              <img src={require("../../assets/1.png") } className="slide__img"/>
            </div> */}
            {/* <div className="slide">
              <img src={require("../../assets/1.png") } className="slide__img"/>
            </div> */}
        </div>
      </div>
    );
  }
}
export default Slideshow;