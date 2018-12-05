import  React from 'react';
import '../slideshow/Slideshow.css';
// import anime from 'animejs';
import { TweenMax, Power4 } from 'gsap';
import Slide from '../slides/Slide';
import Content from '../content/Content';
import debounce from '../../utils/debounce';


let winsize;
const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
calcWinsize();
window.addEventListener('resize', debounce(calcWinsize, 10));

class Slideshow extends React.Component {

  componentDidMount() {
    this.DOM = {};
    // this.DOM.slide = document.querySelector('.slide');

    this.slides = [];
    document.querySelectorAll('.slide').forEach(slideEl => this.slides.push(new Slide(slideEl)));

    this.contents = [];
    document.querySelectorAll('.content > .content__item').forEach(contentEl => this.contents.push(new Content(contentEl)));


    this.slidesTotal = this.slides.length;
    this.current = 0;
    this.isAnimated = false;
    this.isContentOpen = false;

    this.setPos();
    window.addEventListener('resize', () => debounce(this.setPos(), 10));

    this.init();
    this.showImage();
    // this.currentSlide.showContent()
  }

  init() {
    this.clickFn = (slide) => {
      if ( slide.isPositionedRight() ) {
        this.navigate('next');
      }
      else if ( slide.isPositionedLeft() ) {
        this.navigate('prev');
      }
      else if (slide.isPositionedCenter()) {
        this.showContent();
      }
    };
    for (let slide of this.slides) {
      slide.DOM.imgWrap.addEventListener('click', () => {
        this.clickFn(slide);
      });
    }
  }

  setPos() {
    this.nextOutView2 = this.slides[this.current + 3];
    this.nextOutView = this.slides[this.current+2];
    this.nextSlide = this.slides[this.current+1];
    this.currentSlide = this.slides[this.current];
    this.prevSlide = this.slides[this.current-1];
    this.prevOutView = this.slides[this.current-2];
    this.prevOutView2 = this.slides[this.current-3];

    if (!this.isContentOpen) {
      this.currentSlide.setCurrent()
      if (this.nextSlide) this.nextSlide.setRight();
      if (this.nextOutView) this.nextOutView.setRightOutView();
      if (this.nextOutView2) this.nextOutView2.setRightOutView();
      if (this.prevSlide) this.prevSlide.setLeft();
      if (this.prevOutView) this.prevOutView.setLeftOutView();
      if (this.prevOutView2) this.prevOutView2.setLeftOutView();
    } else {
      this.currentSlide.setContentOpen();

      if (this.nextSlide) this.nextSlide.setRightOutView();
      if (this.nextOutView) this.nextOutView.setRightOutView();
      if (this.nextOutView2) this.nextOutView2.setRightOutView();
      if (this.prevSlide) this.prevSlide.setLeftOutView();
      if (this.prevOutView) this.prevOutView.setLeftOutView();
      if (this.prevOutView2) this.prevOutView2.setLeftOutView();
    }


  }

  // Navigate the slideshow.
  navigate(direction) {
    // If animating return.
    if ( !this.isAnimating ) {
      this.isAnimating = true;

      const upcomingPos = direction === 'next' ? this.current + 1 : this.current - 1;
      this.upcomingSlide = this.slides[upcomingPos];

      // Move previous slide to current or out of view left
      if (this.prevSlide) {
        this.prevSlide.moveToPosition({ position: direction === 'next' ? -2 : 0 });
      }

      // Slide current slide forwards or backwards
      this.currentSlide.moveToPosition({ position: direction === 'next' ? -1 : 1 }).then(() => {
        this.setPos();
        this.isAnimating = false;
      });

      // Slide next slide to current or out of view right
      if (this.nextSlide) {
        this.nextSlide.moveToPosition({ position: direction === 'next' ? 0 : 2 });
      }

      // Slide into view right
      if (this.nextOutView) {
        this.nextOutView.moveToPosition({ position: direction === 'next' ? 1 : 2 });
      }

      // Slide into view left
      if (this.prevOutView) {
        this.prevOutView.moveToPosition({ position: direction === 'next' ? -2 : -1 });
      }

      // Update Current
      this.current = (direction === 'next') ?
      // stop next counter if at the end of slides
      this.current <= this.slides.length-2 ? this.current+1 : this.current :
      // stop prev counter id at beginning of slides
      this.current > 0 ? this.current-1 : this.current;
    }
  }

  showContent() {
    // if ( this.isContentOpen || this.isAnimating ) return;
    // allowTilt = false;
    this.isContentOpen = true;
    // this.DOM.el.classList.add('slideshow--previewopen');
    // TweenMax.to(this.DOM.deco, .8, {
    //     ease: Power4.easeInOut,
    //     scaleX: winsize.width/this.DOM.deco.offsetWidth,
    //     scaleY: winsize.height/this.DOM.deco.offsetHeight,
    //     x: -20,
    //     y: 20
    // });
    // Move away right/left slides.
    if (this.prevSlide) this.prevSlide.moveToPosition({position: -2});
    if (this.nextSlide) this.nextSlide.moveToPosition({position: 2});
    // Position the current slide and reset its image scale value.
    this.currentSlide.moveToPosition({position: 3, resetImageScale: true});
    // Show content and back arrow (to close the content).
    // this.contents[this.current].show();
    // Hide texts.
    // this.currentSlide.hideTexts(true);
  }

  hideContent() {
    // Move in right/left slides.
    if (this.prevSlide) this.prevSlide.moveToPosition({position: -1});
    if (this.nextSlide) this.nextSlide.moveToPosition({position: 1});
    // Position the current slide.
    this.currentSlide.moveToPosition({position: 0}).then(() => {
        this.isContentOpen = false;
    });
    // Show texts.
    // this.currentSlide.showTexts();
}

showImage() {
  let whiteOverlay = document.getElementById('white-overlay');
  let colorOverlay = document.getElementById('color-overlay');

  whiteOverlay.style.transformOrigin = "left 50% 0px";
  colorOverlay.style.transformOrigin = "left 50% 0px";


  TweenMax.to(whiteOverlay, 1, {scaleX: 0, ease: Power4.easeInOut});


  TweenMax.fromTo(
    colorOverlay,
    1,
    {scaleX: 1},
    { scaleX: 0,
      ease: Power4.easeInOut,
      delay: 0.2
      // onComplete: ()=> { whiteOverlay.style.transformOrigin = "left 50% 0px"; }
    });
  }

  render() {
    return(
      <div id="gallery">
        <div id="slideshow">
            <div className="slide slide1">
              <div id="color-overlay"/>
              <div id="white-overlay"/>
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
        <button onClick={
         ()=> { this.hideContent(); }
        }>button</button>

        <div class="content">
          <div class="content__item">
            <span class="content__number">1</span>
            <h3 class="content__title">Automation</h3>
            <h4 class="content__subtitle">A tree needs to be your friend if you're going to paint him</h4>
            <div class="content__text">Just let this happen. We just let this flow right out of our minds. Just relax and let it flow. That easy. Let's put some happy little clouds in our world. It's a very cold picture, I may have to go get my coat. It’s about to freeze me to death. This is gonna be a happy little seascape. Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping.</div>
          </div>
          <div class="content__item">
            <span class="content__number">2</span>
            <h3 class="content__title">Machines</h3>
            <h4 class="content__subtitle">This is probably the greatest thing to happen in my life</h4>
            <div class="content__text">We're not trying to teach you a thing to copy. We're just here to teach you a technique, then let you loose into the world. Now, we're going to fluff this cloud. We don't have anything but happy trees here. Let's do that again. Use what you see, don't plan it. Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping.</div>
          </div>
          <div class="content__item">
            <span class="content__number">3</span>
            <h3 class="content__title">Coexistence</h3>
            <h4 class="content__subtitle">The only guide is your heart</h4>
            <div class="content__text">Let's go up in here, and start having some fun The least little bit can do so much. Work on one thing at a time. Don't get carried away - we have plenty of time. Put your feelings into it, your heart, it's your world. These trees are so much fun. I get started on them and I have a hard time stopping. But we're not there yet, so we don't need to worry about it. Now let's put some happy little clouds in here. What the devil. A thin paint will stick to a thick paint. I'm going to mix up a little color. </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Slideshow;