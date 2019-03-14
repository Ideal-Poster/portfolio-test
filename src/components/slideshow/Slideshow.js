import  React from 'react';
import '../slideshow/Slideshow.css';
import Slide from '../slides/Slide';
import debounce from '../utils/debounce';
import projectsAPI from '../../api';
import { TweenMax, Power4 } from 'gsap';

class Slideshow extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      exiting: false
    }
  }

  componentDidMount() {
    this.DOM = {};

    this.DOM.backgroundDesc = document.querySelector('.background__description');
    this.DOM.backgroundTitles = [];
    // Hide background text
    document.querySelectorAll('.background__reveal').forEach((title, i) => {
      if(i < 2){
        this.DOM.backgroundTitles.push(title)
      } else
      {
        if(i === 2) { this.DOM.backgroundTitles.push([]); }
        this.DOM.backgroundTitles[2].push(title);
      }
    });

    this.slides = [];
    document.querySelectorAll('.slide').forEach((slideEl, i) => this.slides.push(new Slide(slideEl, i)));

    window.addEventListener('resize', () => debounce(this.setPos(), 10));
    this.slidesTotal = this.slides.length;
    this.isAnimating = false;

    this.setPos();
    this.init();

    setTimeout(() => {
      this.showBackgroundTitle();
    }, 1000);

    setTimeout(() => {
      this.revealSlides();
    }, 4000);

  }

  componentDidUpdate() {
    if (this.state.exting === true) {
     this.hideSlides();
    }
  }

  showBackgroundTitle() {
    TweenMax.set(this.DOM.backgroundTitles, {
      top: '110%'
    })

    TweenMax.staggerTo(this.DOM.backgroundTitles, 2, {
      ease: Power4.easeInOut,
      top: 0,
      opacity: 1
    }, 0.5);

    TweenMax.to(this.DOM.backgroundDesc, 3, {
      ease: Power4.easeInOut,
      opacity: 1
    })
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
        this.setState({ exting: true });
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
    this.nextOutView2 = this.slides[this.state.current + 3];
    this.nextOutView = this.slides[this.state.current +2];
    this.nextSlide = this.slides[this.state.current +1];
    this.currentSlide = this.slides[this.state.current];
    this.prevSlide = this.slides[this.state.current -1];
    this.prevOutView = this.slides[this.state.current -2];
    this.prevOutView2 = this.slides[this.state.current -3];
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

      const upcomingPos = direction === 'next' ? this.state.current + 1 : this.state.current - 1;
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

      // Update Current`
      this.setState({ current: direction === 'next' ? this.state.current+1 : this.state.current-1 });

      this.updateSlides();
      this.currentSlide.showTitle();
    }
  }

  revealSlides() {
    this.slides.forEach((slide, i) => {
      setTimeout(() => {
        slide.fadeIn();
      }, i * 100);

      this.currentSlide.showTitle();

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
        {/* <div className="background__text-container"> */}
          <div className="
            background__hide-text
            background__line-1">
            <h1 className="background__title background__reveal">&thinsp;Stone</h1>
          </div>
          <div className="
          background__hide-text
          background__line-2">
            <h1 className="background__title background__reveal">&thinsp;&thinsp;&thinsp;&thinsp;&thinsp;Stupid</h1>
          </div>
          <div className="
          background__hide-text
          background__line-3">
            <h1 className="background__title background__reveal">Studio.</h1>
            <p className="background__description">Brooklyn based digital design & fullstack web development created by Malcolm Gourdine.</p>
            <h1  className="background__title background__reveal">Studio.</h1>
          </div>
        {/* </div> */}

        <div id="slideshow">
          {projectsAPI.projects.map((project, i) =>
            <div key={i} className={`slide slide${i}`}>
              <div className="overlay">
                <div>
                  <img src={require(`../../assets/img/${project.img}`) } className="slide__img" alt="slide"/>
                </div>
              </div>

              <div className="title__container">
                <div className="hide__text">
                  <h3 className={`slide__title slide__title${i}`}>
                    Alex
                  </h3>
                </div>

                <div className="hide__text">
                  <h3 className={`slide__title slide__title${i}`}>
                  Brindis
                  </h3>
                </div>

                <div className="hide__text">
                  <h3 className={`slide__title slide__title${i}`}>
                  Design.
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