import React from 'react';
import './splash-page.css' ;
import { Col, Row } from 'antd';


const SplashPage = () => (
  <div id="background">
    <div className="splash__title">
      <h2>A Creative Designer <span className="text__stroke">&</span> Fullstack Web Developer</h2>
    </div>
    <div className="click">
      <h2>Enter</h2>
    </div>
    <div className="splash__info">
      <h2 className="text__stroke">
        Malcolm Gourdine - Brooklyn, New York
      </h2>
    </div>
  </div>
);

export default SplashPage;