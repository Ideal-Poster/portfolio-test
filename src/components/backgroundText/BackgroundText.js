import React from 'react';
import {TweenMax, Power3, Power4 } from 'gsap';

class BackgroundText  extends React.Component {

  constructor() {
    super()
    this.DOM = {
      backgroundTitles: [],
      backgroundDesc: React.createRef()
    }
    // this.DOM.backgroundTitles = [];
  }

  componentDidMount() {
    this.showBackgroundText();
  }

  initBackgroundText() {
    document.querySelectorAll('.background__reveal').forEach((title, i) => {
      if(i < 2){
        this.DOM.backgroundTitles.push(title)
      } else
      {
        if(i === 2) { this.DOM.backgroundTitles.push([]); }
        this.DOM.backgroundTitles[2].push(title);
      }
    });
  }

  showBackgroundText() {
    this.initBackgroundText();
    console.log(this.DOM.backgroundTitles);

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
      TweenMax.fromTo(this.DOM.backgroundDesc.current, 1,
        {
          opacity: 0,
          ease: Power4.easeInOut,
          top: 100
        },{
        opacity: 1,
        top:0
      })
    }, 2000);
  }

  render() {
    return(
      <div>
        <div className="
          background__hide-text
          background__line-1">
          <h1 className="background__title background__reveal">Street. Street</h1>
        </div>
        <div className="
        background__hide-text
        background__line-2">
          <h1 className="background__title background__reveal">se. Wise. Wise</h1>
        </div>
        <div className="
        background__hide-text
        background__line-3">
          <h1 className="background__title background__reveal">Studios.</h1>
          <p ref={this.DOM.backgroundDesc} className="background__description">I'm Maloclm Gourdine. A Digital designer & fullstack Web development. Based in Brooklyn New York</p>
          <h1  className="background__title background__reveal">Studio.</h1>
        </div>
      </div>
    )
  }
}

export default BackgroundText;
