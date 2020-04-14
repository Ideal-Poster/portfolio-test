import React from 'react';
import {TweenMax, Power3, Power4 } from 'gsap';

import './BackgroundText.css';

class BackgroundText  extends React.Component {
  // state = { exiting: false };
  constructor(props) {
    super(props)
    this.DOM = {
      backgroundTitles: [],
      backgroundDesc: null,
      row3: React.createRef()
    }
  }

  componentDidMount() {
    this.showBackgroundText();
  }

  componentDidUpdate() {
    if (this.props.exiting === true) {
      this.hideBackgroundText();
    }
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

    TweenMax.staggerTo(this.DOM.backgroundTitles, 2.5, {
      ease: Power3.easeInOut,
      right: 0,
      left: 0,
      opacity: 1
    }, 0.05);

    setTimeout(() => {
      TweenMax.to(this.DOM.backgroundDesc, 3,
        {
          opacity: 1,
          ease: Power4.easeInOut,
        }
      )
    }, 2000);
  }

  hideBackgroundText() {
    TweenMax.to(
      [this.DOM.backgroundTitles[0], this.DOM.backgroundTitles[1], this.DOM.row3.current ]
      ,
      2,
     {
       ease: Power4.easeInOut,
       transform: 'translateY(-140%)'
      }
    );
  }

  render() {
    return(
      <div>
        <div className="
          background__hide-text"
          id="background__line-1">
          <h1 ref={ (el) => {this.DOM.backgroundTitles[0] = el } }
            className="background__title background__reveal">
              Local. Local. Local
          </h1>
        </div>
        <div className="
          background__hide-text"
          id="background__line-2">
          <h1 ref={ (el) => { this.DOM.backgroundTitles[1] = el } }
            className="background__title background__reveal">
            Area. Area. Area
          </h1>
        </div>
        <div className="background__hide-text"
            id="background__line-3">
          <div id="row-3" ref={ this.DOM.row3 }>
            <h1 ref={ (el) => { this.DOM.backgroundTitles[2] = [el] } }
              className="background__title background__reveal">
              Studios.
            </h1>
            <p ref={ (el) => { this.DOM.backgroundDesc = el } }
              id="background__description">
              I'm Maloclm Gourdine. A Digital designer & fullstack Web developmer. Based in Brooklyn New York.
            </p>
            <h1 ref={ (el) => { this.DOM.backgroundTitles[2] = this.DOM.backgroundTitles[2].concat([el]) } }
              className="background__title background__reveal">
              Studio.
            </h1>
          </div>
        </div>
      </div>
    )
  }
}

export default BackgroundText;
