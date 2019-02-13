import React from 'react';
import './splash-page.css' ;
import { Col, Row } from 'antd';


const SplashPage = () => (
  <div id="background">
    <Row type="flex" justify="center">
      <Col span={24}>
        <h2 className="splash__title">
          Creative <br/>
          Web <br/>
          Production
        </h2>
      </Col>
    </Row>
  </div>
);

export default SplashPage;