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

    this.currentSlide = this.slides[this.current];
    this.nextSlide = this.slides[this.current+1 <= this.slidesTotal-1 ? this.current+1 : 0];
    this.prevSlide = this.slides[this.current-1 >= 0 ? this.current-1 : this.slidesTotal-1];

    this.setPos();

    console.log(this.currentSlide);
    window.addEventListener('resize', () => this.setPos());

  }

  setPos() {
    this.currentSlide.setCurrent();
    this.nextSlide.setRight();
    this.prevSlide.setLeft();
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
            {/* <div className="slide">
              <img src={require("../../assets/1.png") } className="slide__img"/>
            </div>
            <div className="slide">
              <img src={require("../../assets/1.png") } className="slide__img"/>
            </div>
            <div className="slide">
              <img src={require("../../assets/1.png") } className="slide__img"/>
            </div> */}
        </div>
      </div>
    );
  }
}
export default Slideshow;