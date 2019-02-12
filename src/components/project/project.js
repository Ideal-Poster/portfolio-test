import React from 'react';
import './project.css';

import projectsAPI from '../../api';

import { Col } from 'antd';


const Project = (props) => {
  const index = parseInt(props.match.params.number);
  const project = projectsAPI.projects[index];

  return(
    <div id="project__container">
      <Col span={2} style={{background: 'green'}}>
        <p>hello my name is blinko the sintk josep</p>
      </Col>
    </div>
  );

};

export default Project;