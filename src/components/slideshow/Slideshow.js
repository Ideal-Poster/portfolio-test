import  React from 'react';

import '../slideshow/Slideshow.css';
import Slide from '../slides/Slide';
import debounce from '../utils/debounce';
import projectsAPI from '../../api';
import BackgroundText from '../backgroundText/BackgroundText';

let colors = [
    // Grey
   ['#B6B39C', '#ea2f3c', '#cd5d63'],
   // Black
   ['#21201d','#b6b39c','#b6b39c'],
   // Green
   ['#345d31','#FEFEFE','#0e1f2c'],
   // Prurple
  //  ['#4b1e46','#eb272d','#fefefe'],
   // white
  //  ['#e6e7e9','#eb1020','#eb1020'],
   // blue
   ['#077ca4','#fef4f2','#030603']
];

let currentColor = colors[Math.floor(Math.random() * colors.length)][0];
let currentLink =  projectsAPI.projects[0].link;
class Slideshow extends React.Component {

  constructor(props) {
    super(props);
    this.state = { exiting: false }

    this.isAnimating = false;
    this.current = 0;
    this.slidesRefs = [];
    this.slides = [];
    setTimeout(() => {
      this.showSlides();
    }, 2500);
  }

  componentDidMount() {
    this.slidesRefs.forEach((slideEl, i) => this.slides.push(new Slide(slideEl, i)));

    window.addEventListener('resize', () => debounce(this.setPos(), 10));

    this.setPos();
    this.init();

    // setTimeout(() => {
    //   this.showSlides();
    // }, 2500);
  }

  componentWillUnmount() {
    this.routeListen();
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
        // this.props.history.push(`/site/${slide.index}`);
        window.open(currentLink);
      }
    };
    for (let slide of this.slides) {
      slide.DOM.el.addEventListener('click', () => {
        this.clickFn(slide);
      });
    }
    // this.routeListen = this.props.history.listen((location) => {
    //   if (location !== '/home') {
    //     this.setState({ exiting: true });
    //     this.hideSlides();
    //   }
    // });
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
    this.currentSlide.setCurrent();
    currentLink = projectsAPI.projects[this.currentSlide.index].link;
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
      this.current = direction === 'next' ? this.current+1 : this.current-1;

      this.updateSlides();
      this.currentSlide.showTitle();
    }
  }

  showSlides() {
    this.slides.forEach((slide, i) => {
      setTimeout(() => {
        slide.fadeIn();
      }, i * 100);
      this.currentSlide.showTitle();
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
      this.coverSlides();
      this.currentSlide.hideTitleUp();
    }
  }

  render() {
    return(
      <main>
        <div id="gallery__container"
              style={{background: currentColor}}>
          <BackgroundText exiting={ this.state.exiting }/>
          <div id="slideshow">
            {projectsAPI.projects.map((project, i) =>
              <div 
                key={i}
                ref={ (el) => { this.slidesRefs[`${i}`] = el } } 
                className={`slide slide${i}`}>
                  <div className="overlay">
                    <div>
                      <img src={require(`../../assets/img/${project.img}`) } className="slide__img" alt="slide"/>
                    </div>
                  </div>

                  <div className="title__container">
                    <div className="hide__text">
                      <h3 className={`slide__title slide__title${i}`}>
                        {project.name.split(' ')[0]}
                      </h3>
                    </div>

                      {
                       project.name.split(' ')[1] &&
                        <div className="hide__text">
                          <h3 className={`slide__title slide__title${i}`}>
                          { project.name.split(' ')[1] }
                          </h3>
                        </div>
                      }

                      {
                       project.name.split(' ')[2] &&
                        <div className="hide__text">
                          <h3 className={`slide__title slide__title${i}`}>
                           { project.name.split(' ')[2] }
                          </h3>
                        </div>
                      }
                  </div>
              </div>
            )}
          </div>

          <div>
            <p className="navigation name">Malcolm Gourdine</p>
            <p className="navigation contact"><a href="mailto:malcolmgourdine@protonmail.com" style={{color: 'white'}}>[ Get In Touch ]</a></p>
          </div>
        </div>

      </main>
    );
  }
}
export default Slideshow;