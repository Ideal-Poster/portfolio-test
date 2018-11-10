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
    this.DOM.slide = document.querySelector('.slide');
    this.DOM.slides = document.querySelectorAll('.slide');
    console.log(

      -1 * (winsize.width /4)
    );
    console.log(this.DOM.slides);

    window.addEventListener('resize', () => {

      // TweenMax.set(this.DOM.slides[0], {
      //   x: -winsize.width/2,
      //   y: 0
      // });

      // TweenMax.set(this.DOM.slides[1], {
      //   x: winsize.width/2,
      //   y: 0
      // });

      // TweenMax.set(this.DOM.slides[2], {
      //   x: winsize.width/10 + 250,
      //   y: winsize.height / 2
      // });
    })
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