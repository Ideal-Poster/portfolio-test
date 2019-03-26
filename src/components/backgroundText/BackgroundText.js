import React from 'react';
import {TweenMax, Power3, Power4 } from 'gsap';

class BackgroundText  extends React.Component {

  constructor(props) {
    super(props)
    this.DOM = {
      backgroundTitles: [],
    }
  }

  componentDidMount() {
    this.showBackgroundText();
  }

  showBackgroundText() {
    TweenMax.set(this.DOM.backgroundTitles[0], {
      left: '10%'
    })

    TweenMax.set(this.DOM.backgroundTitles[1], {
      right: '10%'
    })

    TweenMax.set(this.DOM.backgroundTitles[2], {
      left: '10%'
    })

    const trimmedArray = this.DOM.backgroundTitles.filter((item, i) => {
      if(i === 3) {
        return false;
      }
      return true;
    })

    TweenMax.staggerTo(trimmedArray, 2.5, {
      ease: Power3.easeInOut,
      right: 0,
      left: 0,
      opacity: 1
    }, 0.05);

    setTimeout(() => {
      TweenMax.to(this.DOM.backgroundTitles[3], 1,
        {
          opacity: 1,
          ease: Power4.easeInOut,
        }
      )
    }, 2000);
  }

  render() {
    return(
      <div>
        <div className="
          background__hide-text
          background__line-1">
          <h1 ref={ (el) => {this.DOM.backgroundTitles[0] = el } }
            className="background__title background__reveal">
            Street. Street
          </h1>
        </div>
        <div className="
          background__hide-text
          background__line-2">
          <h1 ref={ (el) => {this.DOM.backgroundTitles[1] = el } }
            className="background__title background__reveal">
            se. Wise. Wise
          </h1>
        </div>
        <div className="
          background__hide-text
          background__line-3">
          <h1 ref={ (el) => {this.DOM.backgroundTitles[2] = [el] } }
            className="background__title background__reveal">
            Studios.
          </h1>
          <p ref={ (el) => {this.DOM.backgroundTitles[3] = [el] } } className="background__description">I'm Maloclm Gourdine. A Digital designer & fullstack Web development. Based in Brooklyn New York</p>
          <h1 ref={ (el) => { this.DOM.backgroundTitles[2] = this.DOM.backgroundTitles[2].concat([el]) } }
          className="background__title background__reveal">Studio.</h1>
        </div>
      </div>
    )
  }
}

export default BackgroundText;
