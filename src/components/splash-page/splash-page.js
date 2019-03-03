import React, { Component } from 'react';
import './splash-page.css' ;
import { Col, Row } from 'antd';
import { TweenMax, Power4 }from 'gsap';

import { Link }from 'react-router-dom';

class SplashPage extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.history.push(`/home`);
    }, 10000);
  }

  componentDidMount() {
    this.DOM = {
      texts: {}
    };
    this.DOM.texts.hideTexts = document.querySelector('.hide__splash-text');
    this.DOM.texts.title = document.querySelectorAll('.title__text');
    this.DOM.texts.slash = document.querySelector('.slash');
    this.DOM.texts.sideItemsContainer = document.querySelector('.side__items');
    this.DOM.texts.sideItems = document.querySelectorAll('.side__item');


    setTimeout(() => {
      this.fadeInSideItems()
    }, 1000);

    setTimeout(() => {
      this.fadeInSlash();
    }, 4500);

    setTimeout(() => {
      this.showText();
    }, 5500);

    this.fadeInBackground();
  }

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
          <div className="splash__title">
            <Row>
              <Col span={24} justify="center">
                <div className="hide__splash-text"
                // style={{ background: 'orange'}}
                >
                  <h2 className="web title__text">Web</h2>
                </div>
              </Col>
            </Row>

            <div className="row">
              <div className="hide__splash-text"
              // style={{ background: 'purple' }}
              >
                <Link to="/home">
                  <h2 className="design title__text">Design</h2>
                </Link>
              </div>

              <div className="slash__container">
                <h2 className="slash">&nbsp;/&nbsp;</h2>
              </div>

              <div className="hide__splash-text"
              // style={{ background: 'grey' }}
              >
                <h2 className="develop title__text">Develop</h2>
              </div>
            </div>
          </div>

          <div className="side__items">
            <h4 className="side__item name">
              Malcolm <br/>
              Gourdine
            </h4>

            <h4 className="side__item location">
              Brooklyn<br/>
              New York
            </h4>

            <h4 className="side__item time">
              03.21.07<br/>
              04.03.23
            </h4>

            <h4 className="side__item job__description-1">
              UX/UI<br/>
              Design
            </h4>


            <h4 className="side__item job__description-2">
              Fullstack<br/>
              Development
            </h4>
          </div>
        </div>
      </div>
    );
  }
}

export default SplashPage;