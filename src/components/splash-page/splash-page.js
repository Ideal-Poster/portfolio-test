import React, { Component } from 'react';
import './Splash-page.css' ;
import { TweenMax, Power4 }from 'gsap';

// import { Link }from 'react-router-dom';

class SplashPage extends Component {



  showText() {
    TweenMax.staggerFromTo(this.DOM.texts.title , 0.5, {
      ease: Power4.easeInOut,
      position:'relative',
      top: '20'
    },
    {
      top:'0',
      opacity:1
    },
    0.5);
  }

  fadeInSlash() {
    TweenMax.to(this.DOM.texts.slash, 1, {
      opacity: 1
    })
  }

  fadeInSideItems() {
    TweenMax.staggerTo(this.DOM.texts.sideItems, 2, {
      opacity: 1
    }, 0.5)
  }

  fadeInBackground() {
    // let body = document.getElementById
    // console.log(body);
  }

  render() {
    return(
      <div id="splash__page">

        <div id="background" style={{zIndex: 10000}}>


        </div>
      </div>
    );
  }
}

export default SplashPage;