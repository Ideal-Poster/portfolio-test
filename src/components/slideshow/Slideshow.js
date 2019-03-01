import  React from 'react';
import '../slideshow/Slideshow.css';
import Slide from '../slides/Slide';
import debounce from '../utils/debounce';
import Navigation from '../navigation/Navigation';
import projectsAPI from '../../api';

class Slideshow extends React.Component {

  constructor(props) {
    super(props);
    props.history.listen( location => {
      this.hideSlides();
    })
  }

  componentDidMount() {
    this.DOM = {};

    this.slides = [];
    document.querySelectorAll('.slide').forEach((slideEl, i) => this.slides.push(new Slide(slideEl, i)));

    window.addEventListener('resize', () => debounce(this.setPos(), 10));
    this.slidesTotal = this.slides.length;
    this.current = 0;
    this.isAnimating = false;

    this.setPos();
    this.init();
    this.resetSlideCover();

    setTimeout(() => {
      this.revealSlides();
    }, 1000);
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
        this.props.history.push(`/site/${slide.index}`);
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
    if ( !this.isAnimating ) {
      this.isAnimating = true;

      const upcomingPos = direction === 'next' ? this.current + 1 : this.current - 1;
      this.upcomingSlide = this.slides[upcomingPos];

      // Move previous slide to current or out of view left
      if (this.prevSlide) {
        this.prevSlide.moveToPosition({ position: direction === 'next' ? -2 : 0 });
      }

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
      // Slide current slide forwards or backwards
      this.currentSlide.hideTitle();

      this.currentSlide.moveToPosition({ position: direction === 'next' ? -1 : 1 }).then(() => {
        this.isAnimating = false;
        this.setPos();
      });

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

  resetSlideCover() {
    this.slides.forEach(slide => {
      slide.resetCover();
    });
  }

  coverSlides() {
    this.currentSlide.cover();
    if (this.prevSlide) setTimeout(() => this.prevSlide.cover(), 200);
    if (this.nextSlide) setTimeout(() => this.nextSlide.cover(), 400);
  }

  hideSlides() {
    if ( !this.isAnimating ) {
      this.isAnimating = true;
      // this.isContentOpen = true;
      this.coverSlides();
      this.currentSlide.hideTitleUp();
    }
  }

  render() {
    return(
      <div id="gallery__container">
        <Navigation></Navigation>
        <div id="slideshow">
          {projectsAPI.projects.map((project, i) =>
            <div key={i} className={`slide slide${i}`}>
              <img src={require(`../../assets/img/${project.img}`) } className="slide__img"/>
              {/* <div className="color__overlay"/> */}
              <div className="overlay"/>

              <div className="title__container">
                <div className="hide__text">
                  <h3 className={`slide__title slide__title${i}`}
                      style={{ marginBottom: '-8px' }}
                  >
                    Alex Brindis
                  </h3>
                </div>

                <div className="hide__text">
                  <h3 className="slide__title"
                      style={{ marginTop: '-8px' }}
                  >
                    Design
                  </h3>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Slideshow;