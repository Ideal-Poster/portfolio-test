import React, { Component } from 'react';
import './splash-page.css' ;
import { Col, Row } from 'antd';
import { TweenMax, Power4 }from 'gsap';

class SplashPage extends Component {
  componentDidMount() {
    this.DOM = {
      texts: {}
    };
    this.DOM.texts.title = document.querySelectorAll('.title__text');
    this.DOM.texts.slash = document.querySelector('.slash');
    this.DOM.texts.sideItems = document.querySelector('.side__items');
    // console.log('stuff ' + this.DOM.texts.title);

    setTimeout(() => {
      this.fadeInSideItems()
    }, 1000);

    setTimeout(() => {
      this.fadeInSlash();
    }, 2000);

    setTimeout(() => {
      this.showText();
    }, 3000);

    this.fadeInBackground();
  }

  showText() {
    TweenMax.staggerFromTo(this.DOM.texts.title , 0.5, {
      ease: Power4.easeInOut,
      position:'relative',
      top: '20px'
    },
    {
      top:'0',
      opacity:1
    },
    0.5);
  }

  fadeInSlash() {
    TweenMax.to(this.DOM.texts.slash, 0.5, {
      opacity: 1
    })
  }

  fadeInSideItems() {
    TweenMax.to(this.DOM.texts.sideItems, 1, {
      opacity: 1
    })
  }



  fadeInBackground() {
    // let body = document.getElementById
    // console.log(body);

  }


  render() {
    return(
      <div id="background">
        <div className="splash__title">
          <Row>
            <Col span={24} justify="center">
              {/* <div className="hide__splash-text"> */}
                <h2 className="web title__text">Web</h2>
              {/* </div> */}
            </Col>
          </Row>

          <div className="row">
            {/* <div className="hide__splash-text"> */}
              <h2 className="design title__text">Design</h2>
            {/* </div> */}

            <div className="slash__container">
              <h2 className="slash">&nbsp;/&nbsp;</h2>
            </div>

            {/* <div className="hide__splash-text"> */}
              <h2 className="develop title__text">Develop</h2>
            {/* </div> */}
          </div>
        </div>

        <div className="side__items">
          <h4 className="name">
            Malcolm <br/>
            Gourdine
          </h4>

          <h4 className="location">
            Brooklyn<br/>
            New York
          </h4>

          <h4 className="time">
            03.21.07<br/>
            04.03.23
          </h4>

          <h4 className="job__description-1">
            UX/UI<br/>
            Design
          </h4>

          <h4 className="job__description-2">
            Fullstack<br/>
            Development
          </h4>
        </div>
      </div>
    );
  }
}

export default SplashPage;