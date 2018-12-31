import  React from 'react';
import '../slideshow/Slideshow.css';
import Slide from '../slides/Slide';
import Content from '../content/Content';
import debounce from '../utils/debounce';
import Navigation from '../navigation/Navigation';

class Slideshow extends React.Component {

  componentDidMount() {
    this.DOM = {};

    this.slides = [];
    document.querySelectorAll('.slide').forEach(slideEl => this.slides.push(new Slide(slideEl)));

    this.contents = [];
    document.querySelectorAll('.content > .content__item').forEach(contentEl => this.contents.push(new Content(contentEl)));

    window.addEventListener('resize', () => debounce(this.setPos(), 10));
    this.slidesTotal = this.slides.length;
    this.current = 0;
    this.isAnimated = false;
    this.isContentOpen = false;

    this.setPos();
    this.init();
    this.revealSlides();

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
        if (!this.isContentOpen) {
          this.showContent();
          console.log(this.isContentOpen);
        }
        else {
          this.hideContent();
        }

      }
    };
    for (let slide of this.slides) {
      slide.DOM.imgWrap.addEventListener('click', () => {
        this.clickFn(slide);
      });
    }
  }

  updateSlides() {
    this.nextOutView2 = this.slides[this.current + 3];
    this.nextOutView = this.slides[this.current+2];
    this.nextSlide = this.slides[this.current+1];
    this.currentSlide = this.slides[this.current];
    this.prevSlide = this.slides[this.current-1];
    this.prevOutView = this.slides[this.current-2];
    this.prevOutView2 = this.slides[this.current-3];
  }

  setPos() {
    this.updateSlides();

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

    // set height of slide container

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
      this.currentSlide.hideTitle();

      this.currentSlide.moveToPosition({ position: direction === 'next' ? -1 : 1 }).then(() => {
        this.isAnimating = false;
        this.setPos();
      });

      // Slide next slide to current or out of view right

      if (this.nextSlide) {
        this.nextSlide.moveToPosition({ position: direction === 'next' ? 0 : 2 });
      };

      // Slide into view right
      if (this.nextOutView) {
        this.nextOutView.moveToPosition({ position: direction === 'next' ? 1 : 2 });
      }

      // Slide into view left
      if (this.prevOutView) {
        this.prevOutView.moveToPosition({ position: direction === 'next' ? -2 : -1 });
      }

      // Update Current
      this.current = direction === 'next' ? this.current+1 : this.current-1;

      this.updateSlides();
      this.currentSlide.showTitle();
    }
  }

  revealSlides() {
    this.slides.forEach((slide, i) => {
      setTimeout(() => {
        slide.fadeIn();
      }, i * 500);

      setTimeout(() => {
        this.currentSlide.showTitle();
      }, 900);
    });
  }

  coverSlides() {
    this.currentSlide.cover();
    if (this.prevSlide) setTimeout(() => this.prevSlide.cover(), 200);
    if (this.nextSlide) setTimeout(() => this.nextSlide.cover(), 400);
  }

  uncoverSlides() {
    this.currentSlide.uncover();
    if (this.prevSlide) setTimeout(() => this.prevSlide.uncover(), 200);
    if (this.nextSlide) setTimeout(() => this.nextSlide.uncover(), 400);
  }

  showContent() {
    this.isContentOpen = true;
    this.coverSlides();
    this.currentSlide.hideTitleUp();

    setTimeout(() => {
      this.currentSlide.moveToPosition({position: 3, resetImageScale: true}).then(()=> {
        if (this.prevSlide) this.prevSlide.moveToPosition({position: -2});
        if (this.nextSlide) this.nextSlide.moveToPosition({position: 2});
      });
    }, 600);
    setTimeout(() => {
      this.currentSlide.uncover();
    }, 1200);
    // this.setPos();
  }

  hideContent() {
    this.isContentOpen = false;
    this.currentSlide.cover();
    setTimeout(() => {
      this.currentSlide.moveToPosition({position: 0}).then(()=>{
        this.revealSlides();
      });
      if (this.prevSlide) this.prevSlide.moveToPosition({position: -1});
      if (this.nextSlide) this.nextSlide.moveToPosition({position: 1})
    }, 600);


  }

  render() {
    return(
      <div id="gallery">
        <Navigation></Navigation>
        <div id="slideshow">
          <div className="slide slide1">
            <img src={require("../../img/1.jpg") } className="slide__img"/>
            <div class="color__overlay"/>
            <div class="overlay"/>
            <div className="title__container">
              <div className="hide__text">
                <h3 className="slide__title">HRIBWRIB</h3>
              </div>
            </div>
          </div>

          <div className="slide slide2">
            <img src={require("../../img/one.jpg") } className="slide__img"/>
            <div class="color__overlay"/>
            <div class="overlay"/>
            <div className="title__container">
              <div className="hide__text">
                <h3 class="slide__title">
                  Alex<br/>
                </h3>
              </div>
              <div className="hide__text">
                <h3 class="slide__title">
                  brindis<br/>
                </h3>
              </div>
              <div className="hide__text">
                <h3 class="slide__title">
                  artwork<br/>
                </h3>
              </div>
            </div>
          </div>

          <div className="slide slide3">
            <img src={require("../../img/one.jpg") } className="slide__img"/>
            <div class="color__overlay"/>
            <div class="overlay"/>

            <div className="title__container">
              <div className="hide__text">
                <h3 class="slide__title">HRIBWRIB</h3>
              </div>
            </div>
          </div>

          <div className="slide slide4">
            <img src={require("../../img/one.jpg") } className="slide__img"/>
            <div class="color__overlay"/>
            <div class="overlay"/>

            <div className="title__container">
              <div className="hide__text">
                <h3 class="slide__title">HRIBWRIB</h3>
              </div>
            </div>
          </div>
        </div>
        {/* <button onClick={
         ()=> { this.hideContent(); }
        }>button</button> */}

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